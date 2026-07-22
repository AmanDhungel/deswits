import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { signUpSchema } from "@/lib/validations";
import { createEmailUser, findUserByEmail, findUserByPhone } from "@/lib/db/users";
import { issueOtp } from "@/lib/otp";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = signUpSchema.parse(body);

    const [existingEmail, existingPhone] = await Promise.all([
      findUserByEmail(data.email),
      findUserByPhone(data.phone),
    ]);

    if (existingEmail) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    if (existingPhone) {
      return NextResponse.json(
        { error: "An account with this phone number already exists." },
        { status: 409 }
      );
    }

    const user = await createEmailUser({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
    });

    try {
      await issueOtp(data.email, data.fullName);
    } catch (error) {
      // Account already exists at this point — a transient email failure
      // shouldn't fail the signup. The user can request a new code from
      // the sign-in page.
      console.error("Failed to send signup OTP email:", error);
    }

    return NextResponse.json(
      { id: user._id.toString(), email: user.email },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? "Invalid input.", issues: error.issues },
        { status: 400 }
      );
    }

    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
