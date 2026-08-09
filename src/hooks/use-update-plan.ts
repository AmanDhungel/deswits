"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface UpdatePlanPayload {
  plan: "free" | "premium";
}

interface UpdatePlanResponse {
  plan: "free" | "premium";
}

async function updatePlan(payload: UpdatePlanPayload): Promise<UpdatePlanResponse> {
  const res = await fetch("/api/me/plan", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? "Could not update your plan.");
  }

  return data as UpdatePlanResponse;
}

export function useUpdatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
