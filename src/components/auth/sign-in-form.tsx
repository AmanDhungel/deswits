"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GoogleButton } from "@/components/auth/google-button";
import { OtpInput } from "@/components/auth/otp-input";
import { OTP_LENGTH } from "@/lib/validations";
import { useRequestOtp } from "@/hooks/use-request-otp";

const RESEND_SECONDS = 45;

const emailFormSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
});

type EmailFormValues = z.infer<typeof emailFormSchema>;

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const initialEmail = searchParams.get("email") ?? "";
  const alreadySent = searchParams.get("sent") === "1";

  const [step, setStep] = useState<"email" | "otp">(
    alreadySent && initialEmail ? "otp" : "email",
  );
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(alreadySent ? RESEND_SECONDS : 0);

  const requestOtp = useRequestOtp();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: initialEmail },
  });

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  async function handleSendCode(values: EmailFormValues) {
    try {
      await requestOtp.mutateAsync({ email: values.email });
      setEmail(values.email);
      setOtp("");
      setOtpError(null);
      setStep("otp");
      setCooldown(RESEND_SECONDS);
      toast.success("Code sent — check your inbox.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not send code.",
      );
    }
  }

  async function handleResend() {
    if (cooldown > 0 || requestOtp.isPending) return;
    try {
      await requestOtp.mutateAsync({ email });
      setCooldown(RESEND_SECONDS);
      toast.success("New code sent.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not resend code.",
      );
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== OTP_LENGTH) {
      setOtpError(`Enter the ${OTP_LENGTH}-digit code`);
      return;
    }

    setVerifying(true);
    setOtpError(null);

    const result = await signIn("otp", {
      email,
      otp,
      redirect: false,
    });

    setVerifying(false);

    if (result?.error) {
      setOtpError("Invalid or expired code. Please try again.");
      setOtp("");
      return;
    }

    toast.success("Welcome back!");
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-6">
      <GoogleButton callbackUrl={callbackUrl} />

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs uppercase tracking-wider text-muted-foreground">
          or sign in with email
        </span>
        <Separator className="flex-1" />
      </div>

      {step === "email" ? (
        <form
          onSubmit={handleSubmit(handleSendCode)}
          className="flex flex-col gap-4"
          noValidate>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email ? (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            ) : (
              <p className="text-xs text-muted-foreground">
                We&apos;ll email you a 6-digit code — no password needed.
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="glow-gold mt-2 h-11"
            disabled={isSubmitting || requestOtp.isPending}>
            {isSubmitting || requestOtp.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Mail className="size-4" />
            )}
            Send sign-in code
          </Button>
        </form>
      ) : (
        <form
          onSubmit={handleVerify}
          className="flex flex-col gap-4"
          noValidate>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="otp-0">Enter the code</Label>
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setOtp("");
                  setOtpError(null);
                }}
                className="text-xs font-medium text-muted-foreground hover:text-gold">
                Change email
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Sent to <span className="text-foreground">{email}</span>
            </p>

            <OtpInput
              value={otp}
              onChange={(v) => {
                setOtp(v);
                setOtpError(null);
              }}
              length={OTP_LENGTH}
              autoFocus
              disabled={verifying}
              className="mt-1"
            />
            {otpError ? (
              <p className="text-xs text-destructive">{otpError}</p>
            ) : null}
          </div>

          <Button
            type="submit"
            className="glow-gold mt-2 h-11"
            disabled={verifying || otp.length !== OTP_LENGTH}>
            {verifying ? <Loader2 className="size-4 animate-spin" /> : null}
            Verify &amp; sign in
          </Button>

          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0 || requestOtp.isPending}
            className="text-center text-xs font-medium text-muted-foreground hover:text-gold disabled:cursor-not-allowed disabled:opacity-50">
            {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
          </button>
        </form>
      )}
    </div>
  );
}
