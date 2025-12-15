"use client"

import { DollarSign, ShoppingBag, Armchair, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const kpiData = [
  {
    title: "Today's Sales",
    value: "$4,280",
    trend: "+12.5%",
    trendUp: true,
    icon: DollarSign,
  },
  {
    title: "Orders Today",
    value: "156",
    trend: "+8.2%",
    trendUp: true,
    icon: ShoppingBag,
  },
  {
    title: "Active Tables",
    value: "18/24",
    trend: "75%",
    trendUp: true,
    icon: Armchair,
  },
  {
    title: "Monthly Revenue",
    value: "$89,420",
    trend: "+15.3%",
    trendUp: true,
    icon: TrendingUp,
  },
]

export function KPICards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiData.map((kpi) => (
        <Card key={kpi.title} className="bg-card border-border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <kpi.icon className="h-5 w-5 text-primary" />
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  kpi.trendUp ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                }`}
              >
                {kpi.trend}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{kpi.title}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
