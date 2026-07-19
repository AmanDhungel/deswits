"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogOut, Menu, Settings, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/site/logo";
import { Badge } from "@/components/ui/badge";
import { DASHBOARD_NAV } from "@/lib/dashboard-nav";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";

export function DashboardTopbar() {
  const pathname = usePathname();
  const { data: user } = useCurrentUser();

  const currentLabel =
    DASHBOARD_NAV.find((item) => item.href === pathname)?.label ?? "Overview";

  const initials = user?.fullName
    ?.split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-lg sm:px-6">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden" />}>
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 border-border bg-ink p-0">
            <SheetTitle className="sr-only">Dashboard navigation</SheetTitle>
            <div className="flex h-16 items-center border-b border-border px-6">
              <Logo />
            </div>
            <nav className="flex flex-col gap-1 p-4">
              {DASHBOARD_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.soon ? "#" : item.href}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                    pathname === item.href && "border border-gold/30 bg-gold/10 text-gold"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <item.icon className="size-4" />
                    {item.label}
                  </span>
                  {item.soon ? (
                    <Badge variant="outline" className="text-[10px]">
                      Soon
                    </Badge>
                  ) : null}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <h1 className="font-heading text-lg font-semibold text-foreground">
          {currentLabel}
        </h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="size-9 border border-gold/30">
            <AvatarImage src={user?.image ?? undefined} alt={user?.fullName ?? "User"} />
            <AvatarFallback className="bg-secondary text-xs text-secondary-foreground">
              {initials || "DS"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60">
          <DropdownMenuLabel className="flex flex-col gap-0.5">
            <span className="truncate text-sm font-medium text-foreground">
              {user?.fullName ?? "Loading…"}
            </span>
            <span className="truncate text-xs font-normal text-muted-foreground">
              {user?.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>
            <User className="size-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Settings className="size-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => signOut({ callbackUrl: "/" })}>
            <LogOut className="size-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
