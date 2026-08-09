import { NextResponse } from "next/server";
import { z, ZodError } from "zod";

import { auth } from "@/auth";
import { updateUserPlan } from "@/lib/db/users";

const planSchema = z.object({
  plan: z.enum(["free", "premium"]),
});

export async function PATCH(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { plan } = planSchema.parse(body);

    const user = await updateUserPlan(session.user.id, plan);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ plan: user.plan });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? "Invalid input." },
        { status: 400 }
      );
    }

    console.error("Plan update error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
