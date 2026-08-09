import { Gem, Landmark, Network, Store, TreePine, UtensilsCrossed, Users2, Zap } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { StartupCard } from "@/components/site/startup-card";

const STARTUPS = [
  {
    icon: Landmark,
    name: "Dingo Capital",
    category: "Blockchain Banking",
    description:
      "A blockchain-based bank and financial service connecting unbanked people and businesses worldwide to the SWIFT network.",
    href: "https://dingo.capital",
    accent: "gold" as const,
  },
  {
    icon: UtensilsCrossed,
    name: "Delthy Restaurant",
    category: "Hospitality",
    description:
      "An offline restaurant chain expanding globally, bringing a proven dining concept to new markets.",
    href: "https://delthy.restaurant",
    accent: "emerald" as const,
  },
  {
    icon: TreePine,
    name: "Capture Carbon International (CCI)",
    category: "Climate",
    description:
      "Planting 500,000 trees to reduce carbon, then repurposing the wood into furniture that keeps capturing carbon at home.",
    href: "https://greenfenixtree.com",
    accent: "gold" as const,
  },
  {
    icon: Store,
    name: "Franchise International (FIT)",
    category: "Franchising",
    description:
      "Zero-cost franchise opportunities for existing restaurant, lodge, and bar owners — no setup or application fees. More customers, more returning customers, more revenue, more profit.",
    accent: "emerald" as const,
  },
  {
    icon: Gem,
    name: "VMT — Valuable Mineral Token",
    category: "Mining",
    description:
      "A U.S.-based public corporation engaged in global mining and production through licensing, founded in 2021 by mining and digital-asset experts to acquire and trade profitable mining licenses.",
    href: "https://vmt.digital",
    accent: "gold" as const,
  },
  {
    icon: Network,
    name: "Digital Network Holding (dNH)",
    category: "Blockchain SaaS",
    description:
      "Blockchain-based SaaS across cybersecurity, KYC verification, loyalty programs, member management, and digital vouchers — built by a team spanning five continents.",
    href: "https://digitalnetwork.international/",
    accent: "emerald" as const,
  },
  {
    icon: Zap,
    name: "International Clean Energy Inc. (ICE)",
    category: "Clean Energy",
    description:
      "A holding corporation founded by renewable-energy experts and investment advisors, backing disruptive water, wind, solar, and hydrogen projects across production, storage, and distribution.",
    href: "https://www.internationalclean.energy/",
    accent: "gold" as const,
  },
  {
    icon: Users2,
    name: "Social Network International (SNI)",
    category: "Social / Blockchain",
    description: "Building a blockchain-based social network from the ground up.",
    href: "https://socialnetwork.international/",
    accent: "emerald" as const,
  },
];

export function StartupsSection() {
  return (
    <section id="startups" className="relative py-24 sm:py-32">
      <div className="bg-radial-fade pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Available now"
          title="Startups you can invest in today"
          description="A first look at the deal flow live on Deswits — vetted companies across finance, hospitality, climate, mining, and more."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STARTUPS.map((startup) => (
            <StartupCard key={startup.name} {...startup} />
          ))}
        </div>
      </div>
    </section>
  );
}
