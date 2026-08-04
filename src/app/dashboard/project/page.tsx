import type { Metadata } from "next";

import { OverviewStat } from "@/components/dashboard/overview-stat";
import { HoldingsTable } from "@/components/dashboard/holdings-table";
import { OVERVIEW_STATS } from "@/lib/mock-portfolio";

export const metadata: Metadata = {
  title: "Project",
};

export default function ProjectPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground">Project</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Startups you&apos;ve backed on Deswits, and how they&apos;re performing.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {OVERVIEW_STATS.map((stat) => (
          <OverviewStat key={stat.label} {...stat} />
        ))}
      </div>

      <HoldingsTable />
    </div>
  );
}
