import { z } from "zod";
import { isValidPhoneNumber, parsePhoneNumberFromString } from "libphonenumber-js";

/**
 * Any country's phone number, entered with its international dialing code
 * (e.g. +1 415 555 2671, +977 98 1234 5678). Validated and normalized to
 * E.164 (+<countrycode><number>, no spaces) via libphonenumber-js.
 */
export function isValidPhone(raw: string): boolean {
  return isValidPhoneNumber(raw);
}

export function toE164(raw: string): string {
  return parsePhoneNumberFromString(raw)!.format("E.164");
}

export const phoneSchema = z
  .string()
  .trim()
  .min(1, "Phone number is required")
  .refine((val) => isValidPhoneNumber(val), {
    message: "Enter a valid phone number with country code (e.g. +1 415 555 2671)",
  })
  .transform((val) => toE164(val));

const emailSchema = z.string().trim().toLowerCase().email("Enter a valid email address");

export const signUpSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name is too long")
    .regex(/^[a-zA-Z\s.'-]+$/, "Full name can only contain letters and spaces"),
  email: emailSchema,
  phone: phoneSchema,
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export const OTP_LENGTH = 6;

export const requestOtpSchema = z.object({
  email: emailSchema,
});

export type RequestOtpInput = z.infer<typeof requestOtpSchema>;

export const verifyOtpSchema = z.object({
  email: emailSchema,
  otp: z
    .string()
    .trim()
    .regex(new RegExp(`^\\d{${OTP_LENGTH}}$`), `Enter the ${OTP_LENGTH}-digit code`),
});

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
