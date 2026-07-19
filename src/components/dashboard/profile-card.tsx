"use client";

import { Mail, Phone, ShieldCheck, User } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/hooks/use-current-user";

export function ProfileCard() {
  const { data: user, isLoading } = useCurrentUser();

  return (
    <Card className="border-border bg-card/60">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Your verified Deswits profile</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {isLoading ? (
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 text-sm">
              <User className="size-4 shrink-0 text-emerald" />
              <span className="text-foreground">{user?.fullName}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="size-4 shrink-0 text-emerald" />
              <span className="truncate text-muted-foreground">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="size-4 shrink-0 text-emerald" />
              <span className="text-muted-foreground">
                {user?.phone ?? "Not linked (signed in with Google)"}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <ShieldCheck className="size-4 shrink-0 text-gold" />
              <Badge variant="outline" className="border-gold/30 text-gold">
                {user?.provider === "google" ? "Google verified" : "Email verified"}
              </Badge>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
