import type { LucideIcon } from "lucide-react";
import { BookOpen, Rocket, User, Wallet } from "lucide-react";

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const DASHBOARD_NAV: DashboardNavItem[] = [
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Project", href: "/dashboard/project", icon: Rocket },
  { label: "Account", href: "/dashboard/account", icon: Wallet },
  { label: "Learn", href: "/dashboard/learn", icon: BookOpen },
];
