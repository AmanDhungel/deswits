import { FileCheck2, Rocket, ShieldCheck, Wallet } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";

const STEPS = [
  {
    icon: FileCheck2,
    title: "Create & verify your account",
    description:
      "Sign up with Google or your email and phone number. We verify every investor before any capital moves.",
  },
  {
    icon: Rocket,
    title: "Explore vetted startups",
    description:
      "Browse startups that already passed our laser-precision diligence engine — financials, founders, and market fit included.",
  },
  {
    icon: Wallet,
    title: "Invest through blockchain escrow",
    description:
      "Commit funds through a smart-contract escrow. Your stake is recorded on-chain the moment the round closes.",
  },
  {
    icon: ShieldCheck,
    title: "Track growth in real time",
    description:
      "Watch valuations, distributions, and milestones update live from your Deswits dashboard — fully transparent, always auditable.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="bg-radial-fade pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="From sign-up to secured stake in four steps"
          description="No brokers, no paperwork chases — just a transparent, blockchain-backed path from your wallet to a startup's cap table."
        />

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-6 left-0 hidden h-px w-full bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
          {STEPS.map((step, index) => (
            <div key={step.title} className="relative flex flex-col items-start gap-4">
              <div className="relative z-10 flex size-12 items-center justify-center rounded-full border border-gold/40 bg-ink font-heading text-sm font-bold text-gold glow-gold">
                {String(index + 1).padStart(2, "0")}
              </div>
              <step.icon className="size-5 text-emerald" />
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
