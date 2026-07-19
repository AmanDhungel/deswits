import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, LineChart, Rocket, Settings, Wallet } from "lucide-react";

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  soon?: boolean;
}

export const DASHBOARD_NAV: DashboardNavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Portfolio", href: "/dashboard/portfolio", icon: Wallet, soon: true },
  { label: "Startups", href: "/dashboard/startups", icon: Rocket, soon: true },
  { label: "Performance", href: "/dashboard/performance", icon: LineChart, soon: true },
  { label: "Settings", href: "/dashboard/settings", icon: Settings, soon: true },
];
