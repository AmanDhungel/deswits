import Link from "next/link";
import { ShieldCheck, Sparkles, TrendingUp } from "lucide-react";

import { Logo } from "@/components/site/logo";
import { NetworkBackground } from "@/components/site/network-background";
import { COMPANY } from "@/lib/constants";

const HIGHLIGHTS = [
  { icon: ShieldCheck, text: "Blockchain-verified investment records" },
  { icon: Sparkles, text: "Laser-precision startup diligence" },
  { icon: TrendingUp, text: "Real-time portfolio growth tracking" },
];

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-ink p-10 lg:flex">
        <NetworkBackground density={80} className="opacity-60" />
        <div className="bg-radial-fade pointer-events-none absolute inset-0" />
        <div className="relative">
          <Logo />
        </div>

        <div className="relative flex flex-col gap-8">
          <blockquote className="max-w-md text-2xl font-medium leading-snug text-foreground">
            &ldquo;Startup investing should be{" "}
            <span className="text-gradient-gold">secure by design</span>, not
            secure by luck.&rdquo;
          </blockquote>
          <ul className="flex flex-col gap-4">
            {HIGHLIGHTS.map((item) => (
              <li key={item.text} className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex size-8 items-center justify-center rounded-full border border-emerald/30 bg-emerald/10 text-emerald">
                  <item.icon className="size-4" />
                </span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-muted-foreground">
          {COMPANY.address.full} &middot; {COMPANY.phone}
        </p>
      </div>

      <div className="relative flex flex-col items-center justify-center bg-background px-6 py-12 sm:px-12">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative w-full max-w-sm">
          <div className="mb-8 flex justify-center lg:hidden">
            <Logo />
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          </div>

          {children}

          <div className="mt-6 text-center text-sm text-muted-foreground lg:text-left">
            {footer}
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground lg:text-left">
            <Link href="/" className="hover:text-gold">
              &larr; Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
