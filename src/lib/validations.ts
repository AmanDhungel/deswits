import { z } from "zod";

/**
 * Nepali mobile numbers: 10 digits, starting with 97 or 98
 * (Ncell/NTC ranges — 970-989xxxxxxx). We accept common input formats
 * (+977, 0-prefixed, spaces/dashes) and normalize down to the bare 10 digits.
 */
export const NEPALI_PHONE_REGEX = /^(97|98)\d{8}$/;

export function normalizeNepaliPhone(raw: string): string {
  let digits = raw.replace(/[^\d]/g, "");
  if (digits.startsWith("00977")) digits = digits.slice(5);
  else if (digits.startsWith("977") && digits.length > 10) digits = digits.slice(3);
  if (digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

export function isValidNepaliPhone(raw: string): boolean {
  return NEPALI_PHONE_REGEX.test(normalizeNepaliPhone(raw));
}

export function toE164Nepal(raw: string): string {
  return `+977${normalizeNepaliPhone(raw)}`;
}

export const phoneSchema = z
  .string()
  .trim()
  .min(1, "Phone number is required")
  .transform((val) => normalizeNepaliPhone(val))
  .refine((val) => NEPALI_PHONE_REGEX.test(val), {
    message: "Enter a valid Nepali mobile number (starts with 97 or 98, 10 digits)",
  });

export const signUpSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name is too long")
    .regex(/^[a-zA-Z\s.'-]+$/, "Full name can only contain letters and spaces"),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  phone: phoneSchema,
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password is too long")
    .regex(/[a-z]/, "Password needs a lowercase letter")
    .regex(/[A-Z]/, "Password needs an uppercase letter")
    .regex(/[0-9]/, "Password needs a number"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignInInput = z.infer<typeof signInSchema>;
