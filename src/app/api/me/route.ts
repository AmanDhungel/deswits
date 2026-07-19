import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { findUserById } from "@/lib/db/users";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await findUserById(session.user.id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    phone: user.phone ?? null,
    image: user.image ?? null,
    provider: user.provider,
    createdAt: user.createdAt,
  });
}
