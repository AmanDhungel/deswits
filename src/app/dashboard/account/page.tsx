"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function AccountPage() {
  const { data: user, isLoading } = useCurrentUser();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground">Account</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account and sign-in settings.
        </p>
      </div>

      <Card className="max-w-lg border-border bg-card/60">
        <CardHeader>
          <CardTitle>Account details</CardTitle>
          <CardDescription>How you sign in to Deswits</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {isLoading ? (
            <>
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </>
          ) : (
            <>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Sign-in method</span>
                <Badge variant="outline" className="border-gold/30 text-gold">
                  {user?.provider === "google" ? "Google" : "Email code"}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Email</span>
                <span className="truncate text-foreground">{user?.email}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Phone</span>
                <span className="text-foreground">{user?.phone ?? "Not linked"}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Member since</span>
                <span className="text-foreground">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                </span>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Button
        variant="outline"
        className="w-fit border-destructive/30 text-destructive hover:bg-destructive/10"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <LogOut className="size-4" />
        Sign out
      </Button>
    </div>
  );
}
