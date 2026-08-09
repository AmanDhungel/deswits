import type { LucideIcon } from "lucide-react";
import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function StartupCard({
  icon: Icon,
  name,
  category,
  description,
  href,
  accent = "gold",
}: {
  icon: LucideIcon;
  name: string;
  category: string;
  description: string;
  href?: string;
  accent?: "gold" | "emerald";
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card/50 p-6 transition-colors hover:border-transparent",
        accent === "gold" ? "hover:glow-gold" : "hover:glow-emerald"
      )}
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-3">
        <div
          className={cn(
            "inline-flex size-11 items-center justify-center rounded-xl border",
            accent === "gold"
              ? "border-gold/30 bg-gold/10 text-gold"
              : "border-emerald/30 bg-emerald/10 text-emerald"
          )}
        >
          <Icon className="size-5" />
        </div>
        <Badge variant="outline" className="shrink-0 text-muted-foreground">
          {category}
        </Badge>
      </div>

      <div className="relative flex flex-col gap-2">
        <h3 className="font-heading text-lg font-semibold text-foreground">{name}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>

      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "relative mt-auto inline-flex items-center gap-1.5 text-sm font-medium",
            accent === "gold" ? "text-gold hover:underline" : "text-emerald hover:underline"
          )}
        >
          Visit website
          <ExternalLink className="size-3.5" />
        </a>
      ) : (
        <span className="relative mt-auto text-sm font-medium text-muted-foreground">
          Details coming soon
        </span>
      )}
    </div>
  );
}
