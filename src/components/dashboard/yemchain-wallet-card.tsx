"use client";

import { useState } from "react";
import { Check, Copy, Wallet } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/hooks/use-current-user";

export function YemchainWalletCard() {
  const { data: user, isLoading } = useCurrentUser();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!user?.yemchainAddress) return;
    await navigator.clipboard.writeText(user.yemchainAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Card className="border-border bg-card/60">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div>
            <CardTitle>Yemchain wallet</CardTitle>
            <CardDescription>Your on-chain identity</CardDescription>
          </div>
          <Badge variant="outline" className="shrink-0 border-emerald/30 text-emerald">
            <Wallet className="size-3" />
            Yemchain
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-9 w-full" />
        ) : (
          <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2">
            <code className="flex-1 truncate font-mono text-xs text-foreground sm:text-sm">
              {user?.yemchainAddress ?? "Not available"}
            </code>
            {user?.yemchainAddress ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={handleCopy}
                aria-label="Copy wallet address"
              >
                {copied ? <Check className="size-3.5 text-emerald" /> : <Copy className="size-3.5" />}
              </Button>
            ) : null}
          </div>
        )}
        <p className="mt-3 text-xs text-muted-foreground">
          This address uniquely identifies your account on the Yemchain network and is generated automatically when you sign in.
        </p>
      </CardContent>
    </Card>
  );
}
