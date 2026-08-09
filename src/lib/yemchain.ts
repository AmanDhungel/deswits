import crypto from "crypto";

/**
 * Deterministically derives a Yemchain wallet address for a user from their
 * account id, keyed with YEMCHAIN_KEY so addresses can't be predicted
 * without the server secret. There's no Yemchain API integration here (no
 * endpoint docs available) — this is a real, persisted, per-user address
 * computed locally. Swap in actual Yemchain API calls here once real API
 * docs/base URL are available.
 */
export function deriveYemchainAddress(userId: string): string {
  const secret = process.env.YEMCHAIN_KEY;
  if (!secret) {
    throw new Error("Missing YEMCHAIN_KEY environment variable.");
  }
  const hash = crypto.createHmac("sha256", secret).update(userId).digest("hex");
  return `0x${hash.slice(0, 40)}`;
}
