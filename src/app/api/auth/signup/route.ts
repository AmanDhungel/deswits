import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ZodError } from "zod";

import { signUpSchema, toE164Nepal } from "@/lib/validations";
import { createCredentialsUser, findUserByEmail, findUserByPhone } from "@/lib/db/users";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = signUpSchema.parse(body);
    const e164Phone = toE164Nepal(data.phone);

    const [existingEmail, existingPhone] = await Promise.all([
      findUserByEmail(data.email),
      findUserByPhone(e164Phone),
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

    const passwordHash = await bcrypt.hash(data.password, 12);

    const user = await createCredentialsUser({
      fullName: data.fullName,
      email: data.email,
      phone: e164Phone,
      passwordHash,
    });

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
