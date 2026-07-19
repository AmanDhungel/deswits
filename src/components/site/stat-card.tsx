import { cn } from "@/lib/utils";

export function StatCard({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card/60 px-5 py-4 text-center card-glass",
        className
      )}
    >
      <div className="font-heading text-2xl font-bold text-gradient-gold sm:text-3xl">
        {value}
      </div>
      <div className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground sm:text-sm">
        {label}
      </div>
    </div>
  );
}
