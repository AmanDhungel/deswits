import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { requestOtpSchema } from "@/lib/validations";
import { findUserByEmail } from "@/lib/db/users";
import { issueOtp } from "@/lib/otp";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = requestOtpSchema.parse(body);

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: "No account found with that email. Please sign up first." },
        { status: 404 }
      );
    }

    const result = await issueOtp(email, user.fullName);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 429 });
    }

    return NextResponse.json({ message: "Verification code sent." });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? "Invalid input." },
        { status: 400 }
      );
    }

    console.error("OTP request error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
