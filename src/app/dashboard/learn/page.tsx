import type { Metadata } from "next";
import { Blocks, EyeOff, Fingerprint, Wallet } from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Learn",
};

const ARTICLES = [
  {
    icon: Blocks,
    title: "What is the Yemchain blockchain?",
    description:
      "How Deswits records every deal on-chain, and why that matters for your investment.",
  },
  {
    icon: Fingerprint,
    title: "Understanding decentralized identity",
    description:
      "Why your identity doesn't live in one central database — and how that protects you.",
  },
  {
    icon: EyeOff,
    title: "Zero-knowledge proofs, explained simply",
    description: "How we verify who you are without ever seeing your private data.",
  },
  {
    icon: Wallet,
    title: "Self-custody 101",
    description: "What it means to hold your own keys, and why it matters for your assets.",
  },
];

export default function LearnPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground">Learn</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Short guides on the technology behind Deswits.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {ARTICLES.map((article) => (
          <Card key={article.title} className="border-border bg-card/60">
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-lg border border-emerald/30 bg-emerald/10 text-emerald">
                <article.icon className="size-5" />
              </div>
              <CardTitle className="text-base">{article.title}</CardTitle>
              <CardDescription>{article.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
