import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sign-in error",
};

const ERROR_MESSAGES: Record<string, string> = {
  AccessDenied:
    "We couldn't sign you in. If you used Google, make sure you've created a Deswits account first — otherwise please try again in a moment.",
  Configuration: "Something's misconfigured on our end. Please try again shortly.",
  Verification: "That sign-in code is no longer valid. Request a new one.",
  CredentialsSignin: "Invalid or expired code. Please request a new one.",
  Default: "Something went wrong while signing you in. Please try again.",
};

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const message = (error && ERROR_MESSAGES[error]) || ERROR_MESSAGES.Default;

  return (
    <AuthShell
      title="Sign-in error"
      subtitle="Something interrupted the sign-in process."
      footer={
        <>
          Need help?{" "}
          <a href={`mailto:${COMPANY.email}`} className="font-medium text-gold hover:underline">
            Contact us
          </a>
        </>
      }
    >
      <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
        <span className="flex size-12 items-center justify-center rounded-full border border-destructive/30 bg-destructive/10 text-destructive">
          <AlertTriangle className="size-6" />
        </span>
        <p className="text-sm text-muted-foreground">{message}</p>
        <Button
          className="glow-gold mt-2 h-11 w-full"
          nativeButton={false}
          render={<Link href="/sign-in" />}
        >
          Back to sign in
        </Button>
      </div>
    </AuthShell>
  );
}
