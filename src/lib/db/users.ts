import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";

export interface UserDocument {
  _id: ObjectId;
  fullName: string;
  email: string;
  phone?: string;
  image?: string;
  provider: "email" | "google";
  createdAt: Date;
  updatedAt: Date;
}

export type PublicUser = Omit<UserDocument, "_id"> & { id: string };

export function toPublicUser(user: UserDocument): PublicUser {
  const { _id, fullName, email, phone, image, provider, createdAt, updatedAt } = user;
  return { id: _id.toString(), fullName, email, phone, image, provider, createdAt, updatedAt };
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
  const now = new Date();
  const doc: Omit<UserDocument, "_id"> = {
    fullName: input.fullName,
    email: input.email.toLowerCase(),
    phone: input.phone,
    provider: "email",
    createdAt: now,
    updatedAt: now,
  };
  const result = await users.insertOne(doc as UserDocument);
  return { ...doc, _id: result.insertedId } as UserDocument;
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

  const now = new Date();
  const doc: Omit<UserDocument, "_id"> = {
    fullName: input.fullName,
    email: input.email.toLowerCase(),
    image: input.image,
    provider: "google",
    createdAt: now,
    updatedAt: now,
  };
  const result = await users.insertOne(doc as UserDocument);
  return { ...doc, _id: result.insertedId } as UserDocument;
}

export async function ensureUserIndexes() {
  const users = await usersCollection();
  await users.createIndex({ email: 1 }, { unique: true });
  await users.createIndex({ phone: 1 }, { unique: true, sparse: true });
}
