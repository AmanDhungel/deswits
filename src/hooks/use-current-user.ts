"use client";

import { useQuery } from "@tanstack/react-query";

export interface CurrentUser {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  image: string | null;
  provider: "email" | "google";
  createdAt: string;
}

async function fetchCurrentUser(): Promise<CurrentUser> {
  const res = await fetch("/api/me");
  if (!res.ok) {
    throw new Error("Failed to load your profile.");
  }
  return res.json();
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchCurrentUser,
  });
}
