"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GoogleButton } from "@/components/auth/google-button";
import { PhoneInput } from "@/components/auth/phone-input";
import { signUpSchema, type SignUpInput } from "@/lib/validations";
import { useSignup } from "@/hooks/use-signup";

export function SignUpForm() {
  const router = useRouter();
  const signup = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(values: SignUpInput) {
    try {
      await signup.mutateAsync({
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
      });

      toast.success("Account created — we've emailed you a sign-in code.");
      router.push(`/sign-in?email=${encodeURIComponent(values.email)}&sent=1`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <GoogleButton label="Sign up with Google" />

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs uppercase tracking-wider text-muted-foreground">
          or sign up with email
        </span>
        <Separator className="flex-1" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            placeholder="Ram Sharma"
            aria-invalid={!!errors.fullName}
            {...register("fullName")}
          />
          {errors.fullName ? (
            <p className="text-xs text-destructive">{errors.fullName.message}</p>
          ) : null}
        </div>

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
              We&apos;ll email you a code here to sign in — no password to remember.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">Phone number</Label>
          <PhoneInput
            id="phone"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone ? (
            <p className="text-xs text-destructive">{errors.phone.message}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              We currently support Nepali mobile numbers only.
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="glow-gold mt-2 h-11"
          disabled={isSubmitting || signup.isPending}
        >
          {isSubmitting || signup.isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : null}
          Create account
        </Button>
      </form>
    </div>
  );
}
