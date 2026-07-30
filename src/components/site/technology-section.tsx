import { Blocks, EyeOff, Fingerprint, Wallet } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { FeatureCard } from "@/components/site/feature-card";

const TECHNOLOGY_POINTS = [
  {
    icon: Blocks,
    title: "Yemchain blockchain",
    description:
      "Every deal, cap table entry, and disbursement settles on the Yemchain network, giving each investment a tamper-proof, publicly verifiable record.",
    accent: "gold" as const,
  },
  {
    icon: Fingerprint,
    title: "Decentralized identity management",
    description:
      "Your identity is verified and stored through decentralized identity protocols — no single central database holding your personal data hostage.",
    accent: "emerald" as const,
  },
  {
    icon: EyeOff,
    title: "Zero knowledge proof cybersecurity",
    description:
      "Zero-knowledge proofs let us verify your credentials and transactions without ever exposing your private data to us or anyone else.",
    accent: "gold" as const,
  },
  {
    icon: Wallet,
    title: "Self custody services",
    description:
      "You hold the keys. Self-custody wallets keep your assets under your control at all times — never locked away in a custodial vault.",
    accent: "emerald" as const,
  },
];

export function TechnologySection() {
  return (
    <section id="technology" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The technology"
          title="Built on infrastructure you can verify"
          description="Deswits isn't blockchain in name only — here's the stack powering every investment on the platform."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {TECHNOLOGY_POINTS.map((point) => (
            <FeatureCard key={point.title} {...point} />
          ))}
        </div>
      </div>
    </section>
  );
}
