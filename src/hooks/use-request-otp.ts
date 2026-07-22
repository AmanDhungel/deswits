"use client";

import { useMutation } from "@tanstack/react-query";

export interface RequestOtpPayload {
  email: string;
}

interface RequestOtpResponse {
  message: string;
}

async function requestOtp(payload: RequestOtpPayload): Promise<RequestOtpResponse> {
  const res = await fetch("/api/auth/otp/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? "Could not send code. Please try again.");
  }

  return data as RequestOtpResponse;
}

export function useRequestOtp() {
  return useMutation({
    mutationFn: requestOtp,
  });
}
