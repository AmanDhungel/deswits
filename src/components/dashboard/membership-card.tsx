"use client";

import { Crown, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useUpdatePlan } from "@/hooks/use-update-plan";

const PREMIUM_PERKS = [
  "Priority access to new startup deals",
  "Lower minimum investment thresholds",
  "Dedicated laser-diligence reports",
];

export function MembershipCard() {
  const { data: user, isLoading } = useCurrentUser();
  const updatePlan = useUpdatePlan();

  const isPremium = user?.plan === "premium";

  function handleToggle() {
    const nextPlan = isPremium ? "free" : "premium";
    updatePlan.mutate(
      { plan: nextPlan },
      {
        onSuccess: () => {
          toast.success(
            nextPlan === "premium" ? "Welcome to Premium!" : "You're back on the Free plan."
          );
        },
        onError: (error) => {
          toast.error(error instanceof Error ? error.message : "Could not update your plan.");
        },
      }
    );
  }

  return (
    <Card className="border-border bg-card/60">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div>
            <CardTitle>Membership</CardTitle>
            <CardDescription>Your Deswits plan</CardDescription>
          </div>
          {isLoading ? null : (
            <Badge
              variant="outline"
              className={isPremium ? "border-gold/30 text-gold" : "text-muted-foreground"}
            >
              {isPremium ? (
                <>
                  <Crown className="size-3" /> Premium
                </>
              ) : (
                "Free"
              )}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {isLoading ? (
          <>
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </>
        ) : (
          <>
            <ul className="flex flex-col gap-2">
              {PREMIUM_PERKS.map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Sparkles className="mt-0.5 size-3.5 shrink-0 text-emerald" />
                  {perk}
                </li>
              ))}
            </ul>

            <Button
              className={isPremium ? "" : "glow-gold"}
              variant={isPremium ? "outline" : "default"}
              disabled={updatePlan.isPending}
              onClick={handleToggle}
            >
              {isPremium ? "Switch to Free" : "Upgrade to Premium"}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
