import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { findUserById, ensureYemchainAddress } from "@/lib/db/users";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await findUserById(session.user.id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const withWallet = await ensureYemchainAddress(user);

  return NextResponse.json({
    id: withWallet._id.toString(),
    fullName: withWallet.fullName,
    email: withWallet.email,
    phone: withWallet.phone ?? null,
    image: withWallet.image ?? null,
    provider: withWallet.provider,
    plan: withWallet.plan ?? "free",
    yemchainAddress: withWallet.yemchainAddress ?? null,
    createdAt: withWallet.createdAt,
  });
}
