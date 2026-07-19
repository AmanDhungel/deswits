import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function FeatureCard({
  icon: Icon,
  title,
  description,
  accent = "gold",
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  accent?: "gold" | "emerald";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 transition-colors hover:border-transparent",
        accent === "gold" ? "hover:glow-gold" : "hover:glow-emerald",
        className
      )}
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div
        className={cn(
          "relative mb-4 inline-flex size-11 items-center justify-center rounded-xl border",
          accent === "gold"
            ? "border-gold/30 bg-gold/10 text-gold"
            : "border-emerald/30 bg-emerald/10 text-emerald"
        )}
      >
        <Icon className="size-5" />
      </div>
      <h3 className="relative font-heading text-lg font-semibold text-foreground">
        {title}
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
