"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/site/logo";
import { Badge } from "@/components/ui/badge";
import { DASHBOARD_NAV } from "@/lib/dashboard-nav";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-ink/60 lg:flex">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Logo />
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-4">
        {DASHBOARD_NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.soon ? "#" : item.href}
              aria-disabled={item.soon}
              className={cn(
                "flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "border border-gold/30 bg-gold/10 text-gold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                item.soon && "cursor-not-allowed opacity-60 hover:bg-transparent hover:text-muted-foreground"
              )}
              onClick={(e) => item.soon && e.preventDefault()}
            >
              <span className="flex items-center gap-3">
                <item.icon className="size-4" />
                {item.label}
              </span>
              {item.soon ? (
                <Badge variant="outline" className="border-border text-[10px] text-muted-foreground">
                  Soon
                </Badge>
              ) : null}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
