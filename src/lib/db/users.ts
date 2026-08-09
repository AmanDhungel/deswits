import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { deriveYemchainAddress } from "@/lib/yemchain";

export type Plan = "free" | "premium";

export interface UserDocument {
  _id: ObjectId;
  fullName: string;
  email: string;
  phone?: string;
  image?: string;
  provider: "email" | "google";
  plan: Plan;
  yemchainAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PublicUser = Omit<UserDocument, "_id"> & { id: string };

export function toPublicUser(user: UserDocument): PublicUser {
  const { _id, fullName, email, phone, image, provider, plan, yemchainAddress, createdAt, updatedAt } = user;
  // Documents created before the plan/yemchainAddress fields existed default gracefully.
  return {
    id: _id.toString(),
    fullName,
    email,
    phone,
    image,
    provider,
    plan: plan ?? "free",
    yemchainAddress,
    createdAt,
    updatedAt,
  };
}

async function usersCollection() {
  const db = await getDb();
  return db.collection<UserDocument>("users");
}

let indexesEnsured: Promise<void> | null = null;

async function ensureIndexesOnce() {
  if (!indexesEnsured) {
    indexesEnsured = ensureUserIndexes().catch((err) => {
      indexesEnsured = null;
      throw err;
    });
  }
  return indexesEnsured;
}

export async function findUserByEmail(email: string) {
  const users = await usersCollection();
  return users.findOne({ email: email.toLowerCase() });
}

export async function findUserByPhone(phone: string) {
  const users = await usersCollection();
  return users.findOne({ phone });
}

export async function findUserById(id: string) {
  if (!ObjectId.isValid(id)) return null;
  const users = await usersCollection();
  return users.findOne({ _id: new ObjectId(id) });
}

export async function createEmailUser(input: {
  fullName: string;
  email: string;
  phone: string;
}) {
  await ensureIndexesOnce();
  const users = await usersCollection();
  const _id = new ObjectId();
  const now = new Date();
  const doc: UserDocument = {
    _id,
    fullName: input.fullName,
    email: input.email.toLowerCase(),
    phone: input.phone,
    provider: "email",
    plan: "free",
    yemchainAddress: deriveYemchainAddress(_id.toString()),
    createdAt: now,
    updatedAt: now,
  };
  await users.insertOne(doc);
  return doc;
}

export async function findOrCreateGoogleUser(input: {
  email: string;
  fullName: string;
  image?: string;
}) {
  await ensureIndexesOnce();
  const users = await usersCollection();
  const existing = await users.findOne({ email: input.email.toLowerCase() });
  if (existing) return existing;

  const _id = new ObjectId();
  const now = new Date();
  const doc: UserDocument = {
    _id,
    fullName: input.fullName,
    email: input.email.toLowerCase(),
    image: input.image,
    provider: "google",
    plan: "free",
    yemchainAddress: deriveYemchainAddress(_id.toString()),
    createdAt: now,
    updatedAt: now,
  };
  await users.insertOne(doc);
  return doc;
}

export async function updateUserPlan(id: string, plan: Plan) {
  if (!ObjectId.isValid(id)) return null;
  const users = await usersCollection();
  await users.updateOne({ _id: new ObjectId(id) }, { $set: { plan, updatedAt: new Date() } });
  return users.findOne({ _id: new ObjectId(id) });
}

/** Backfills a Yemchain address for accounts created before this field existed. */
export async function ensureYemchainAddress(user: UserDocument): Promise<UserDocument> {
  if (user.yemchainAddress) return user;

  const address = deriveYemchainAddress(user._id.toString());
  const users = await usersCollection();
  await users.updateOne({ _id: user._id }, { $set: { yemchainAddress: address, updatedAt: new Date() } });
  return { ...user, yemchainAddress: address };
}

export async function ensureUserIndexes() {
  const users = await usersCollection();
  await users.createIndex({ email: 1 }, { unique: true });
  await users.createIndex({ phone: 1 }, { unique: true, sparse: true });
}
