"use client";

import { useMutation } from "@tanstack/react-query";

export interface SignupPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

interface SignupResponse {
  id: string;
  email: string;
}

async function signupRequest(payload: SignupPayload): Promise<SignupResponse> {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? "Something went wrong. Please try again.");
  }

  return data as SignupResponse;
}

export function useSignup() {
  return useMutation({
    mutationFn: signupRequest,
  });
}
