"use client";

import { OverviewStat } from "@/components/dashboard/overview-stat";
import { HoldingsTable } from "@/components/dashboard/holdings-table";
import { ProfileCard } from "@/components/dashboard/profile-card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { OVERVIEW_STATS } from "@/lib/mock-portfolio";

export default function DashboardPage() {
  const { data: user } = useCurrentUser();
  const firstName = user?.fullName?.split(" ")[0];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground">
          {firstName ? `Welcome back, ${firstName}` : "Welcome back"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s a snapshot of your blockchain-secured investment portfolio.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {OVERVIEW_STATS.map((stat) => (
          <OverviewStat key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <HoldingsTable />
        <ProfileCard />
      </div>
    </div>
  );
}
