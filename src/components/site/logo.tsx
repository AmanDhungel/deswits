import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Icon-only mark: gold ascending arrow (growth) threaded through an emerald
 * node network (blockchain), echoing the Deswits brand mark. Pure SVG so it
 * never depends on an image asset — swap for /public/logo.png + <Image> if
 * you want to drop in the exact brand file.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("size-8", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="deswits-gold" x1="4" y1="40" x2="44" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--gold-dim)" />
          <stop offset="0.5" stopColor="var(--gold)" />
          <stop offset="1" stopColor="var(--gold-soft)" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="47" height="47" rx="12" fill="var(--ink)" stroke="var(--border)" />
      <path
        d="M9 33 L18 24 L24 29 L37 14"
        fill="none"
        stroke="var(--emerald)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <circle cx="9" cy="33" r="2.1" fill="var(--emerald-glow)" />
      <circle cx="18" cy="24" r="2.1" fill="var(--emerald-glow)" />
      <circle cx="24" cy="29" r="2.1" fill="var(--emerald-glow)" />
      <path
        d="M11 37 L27 15 H33 L17 37 H11 Z M29 15 H35 L29 23 L26 19 L29 15 Z"
        fill="url(#deswits-gold)"
      />
      <path d="M27 15 L37 15 L37 8 Z" fill="url(#deswits-gold)" />
    </svg>
  );
}

export function Logo({
  className,
  showTagline = false,
  href = "/",
}: {
  className?: string;
  showTagline?: boolean;
  href?: string | null;
}) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-lg font-bold tracking-wide text-gradient-gold">
          DESWITS
        </span>
        {showTagline ? (
          <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Blockchain Startup Investments
          </span>
        ) : null}
      </span>
    </span>
  );

  if (href === null) return content;

  return (
    <Link href={href} className="inline-flex items-center outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
      {content}
    </Link>
  );
}
