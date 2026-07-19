import { Cuboid, Radar, TrendingUp } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { NetworkBackground } from "@/components/site/network-background";
import { FeatureCard } from "@/components/site/feature-card";
import { COMPANY } from "@/lib/constants";

const FEATURES = [
  {
    icon: Cuboid,
    title: "Blockchain-verified deals",
    description:
      "Every investment, cap table entry, and disbursement is written to an immutable ledger — so ownership and returns can never be quietly rewritten.",
    accent: "gold" as const,
  },
  {
    icon: Radar,
    title: "Laser-precision diligence",
    description:
      "Our laser-diligence engine scans startup fundamentals, founder track record, and market signal before a single deal is ever listed to investors.",
    accent: "emerald" as const,
  },
  {
    icon: TrendingUp,
    title: "Built for growth",
    description:
      "Real-time dashboards, automated distributions, and transparent smart contracts keep your portfolio growing without the paperwork.",
    accent: "gold" as const,
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeading
              align="left"
              eyebrow="What is Deswits"
              title="Startup investing, made secure by blockchain."
            />
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {COMPANY.description} We exist to close the gap between
              promising early-stage startups and everyday investors who want
              in — without sacrificing security, transparency, or growth.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Headquartered at {COMPANY.address.full}, Deswits pairs
              blockchain-grade record keeping with a laser-precision
              diligence pipeline, so every startup on the platform has
              already cleared a rigorous bar before you ever see the deal.
            </p>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border bg-card/40">
            <NetworkBackground density={90} />
            <div className="bg-radial-fade absolute inset-0" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-float rounded-2xl border border-gold/30 bg-ink/80 px-8 py-6 text-center card-glass glow-gold">
                <p className="font-heading text-4xl font-bold text-gradient-gold">100%</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  On-chain deal records
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
