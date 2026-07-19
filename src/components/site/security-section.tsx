import { Fingerprint, Lock, ScanEye, Server } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { FeatureCard } from "@/components/site/feature-card";

const SECURITY_POINTS = [
  {
    icon: Lock,
    title: "End-to-end encryption",
    description:
      "Every credential, document, and transaction is encrypted in transit and at rest — nothing sits on our servers in plain text.",
    accent: "emerald" as const,
  },
  {
    icon: Fingerprint,
    title: "Verified investor identity",
    description:
      "Google sign-in and phone-verified accounts keep bad actors out, so every stake on the ledger belongs to a real, verified person.",
    accent: "gold" as const,
  },
  {
    icon: Server,
    title: "Immutable blockchain ledger",
    description:
      "Ownership records are written on-chain and can't be silently altered — your stake is provable at any time, by anyone.",
    accent: "emerald" as const,
  },
  {
    icon: ScanEye,
    title: "Continuous risk monitoring",
    description:
      "Our laser-diligence engine keeps watching portfolio companies after funding closes, flagging risk before it reaches your dashboard.",
    accent: "gold" as const,
  },
];

export function SecuritySection() {
  return (
    <section id="security" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Security first"
          title="Investing should feel safer, not riskier"
          description="Deswits was built on one premise: startup investing gets more secure when the ledger can't lie. Here's how we back that up."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {SECURITY_POINTS.map((point) => (
            <FeatureCard key={point.title} {...point} />
          ))}
        </div>
      </div>
    </section>
  );
}
