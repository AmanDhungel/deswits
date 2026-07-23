import crypto from "crypto";
import bcrypt from "bcryptjs";

import { getDb } from "@/lib/mongodb";
import { sendOtpEmail } from "@/lib/email";
import { OTP_LENGTH } from "@/lib/validations";

const OTP_TTL_MS = 5 * 60 * 1000;
const RESEND_COOLDOWN_MS = 45 * 1000;
const MAX_ATTEMPTS = 5;

interface OtpDocument {
  email: string;
  codeHash: string;
  expiresAt: Date;
  attempts: number;
  createdAt: Date;
}

async function otpCollection() {
  const db = await getDb();
  return db.collection<OtpDocument>("otp_codes");
}

let indexesEnsured: Promise<void> | null = null;

async function ensureOtpIndexes() {
  if (!indexesEnsured) {
    indexesEnsured = (async () => {
      const col = await otpCollection();
      await col.createIndex({ email: 1 }, { unique: true });
      await col.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    })().catch((err) => {
      indexesEnsured = null;
      throw err;
    });
  }
  return indexesEnsured;
}

function generateOtpCode(): string {
  const max = 10 ** OTP_LENGTH;
  const code = crypto.randomInt(0, max);
  return code.toString().padStart(OTP_LENGTH, "0");
}

export type IssueOtpResult = { ok: true } | { ok: false; error: string };

export async function issueOtp(
  email: string,
  fullName?: string,
): Promise<IssueOtpResult> {
  await ensureOtpIndexes();
  const col = await otpCollection();

  const existing = await col.findOne({ email });
  if (
    existing &&
    existing.createdAt.getTime() > Date.now() - RESEND_COOLDOWN_MS
  ) {
    const waitSeconds = Math.ceil(
      (RESEND_COOLDOWN_MS - (Date.now() - existing.createdAt.getTime())) / 1000,
    );
    return {
      ok: false,
      error: `Please wait ${waitSeconds}s before requesting another code.`,
    };
  }

  const code = generateOtpCode();
  const codeHash = await bcrypt.hash(code, 10);
  const now = new Date();

  await col.updateOne(
    { email },
    {
      $set: {
        email,
        codeHash,
        expiresAt: new Date(now.getTime() + OTP_TTL_MS),
        attempts: 0,
        createdAt: now,
      },
    },
    { upsert: true },
  );

  await sendOtpEmail({ to: email, code, fullName });

  return { ok: true };
}

export type VerifyOtpResult = { ok: true } | { ok: false; error: string };

export async function verifyOtp(
  email: string,
  code: string,
): Promise<VerifyOtpResult> {
  const col = await otpCollection();
  const record = await col.findOne({ email });

  if (!record) {
    return {
      ok: false,
      error: "Code not found or already used. Request a new one.",
    };
  }

  if (record.expiresAt < new Date()) {
    await col.deleteOne({ email });
    return { ok: false, error: "Code expired. Request a new one." };
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    await col.deleteOne({ email });
    return {
      ok: false,
      error: "Too many incorrect attempts. Request a new code.",
    };
  }

  const valid = await bcrypt.compare(code, record.codeHash);
  if (!valid) {
    await col.updateOne({ email }, { $inc: { attempts: 1 } });
    return { ok: false, error: "Incorrect code." };
  }

  await col.deleteOne({ email });
  return { ok: true };
}
