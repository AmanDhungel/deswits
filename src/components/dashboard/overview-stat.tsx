import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function OverviewStat({
  label,
  value,
  change,
  positive,
}: {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}) {
  return (
    <Card className="border-border bg-card/60">
      <CardContent className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </span>
        <span className="font-heading text-2xl font-bold text-foreground">{value}</span>
        <span
          className={cn(
            "inline-flex items-center gap-1 text-xs font-medium",
            positive ? "text-emerald" : "text-destructive"
          )}
        >
          {positive ? (
            <ArrowUpRight className="size-3.5" />
          ) : (
            <ArrowDownRight className="size-3.5" />
          )}
          {change}
        </span>
      </CardContent>
    </Card>
  );
}
