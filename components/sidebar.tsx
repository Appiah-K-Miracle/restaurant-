"use client"

import Link from "next/link"
import {
  LayoutDashboard,
  ShoppingCart,
  UtensilsCrossed,
  Users,
  Package,
  BarChart3,
  Settings,
  LogOut,
  Armchair,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const topNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/", active: true },
  { icon: ShoppingCart, label: "POS / Orders", href: "/pos" },
  { icon: UtensilsCrossed, label: "Menu", href: "/menu" },
  { icon: Armchair, label: "Tables", href: "/tables" },
  { icon: Users, label: "Staff", href: "/staff" },
  { icon: Package, label: "Inventory", href: "/inventory" },
  { icon: BarChart3, label: "Reports", href: "/reports" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

const bottomNavItems = [{ icon: LogOut, label: "Logout", href: "/logout" }]

export function Sidebar() {
  return (
    <TooltipProvider delayDuration={0}>
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-16 flex-col items-center border-r border-sidebar-border bg-sidebar py-4">
        {/* Logo */}
        <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
          <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
        </div>

        {/* Top Navigation */}
        <nav className="flex flex-1 flex-col items-center gap-2">
          {topNavItems.map((item) => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Link href={item.href}>
                  <button
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                      item.active
                        ? "bg-sidebar-accent text-primary"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                  </button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-card text-card-foreground border-border">
                {item.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>

        {/* Bottom Navigation */}
        <nav className="flex flex-col items-center gap-2">
          {bottomNavItems.map((item) => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Link href={item.href}>
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-destructive">
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                  </button>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-card text-card-foreground border-border">
                {item.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </aside>
    </TooltipProvider>
  )
}
