"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, ChefHat, CheckCircle2 } from "lucide-react"

const orderStatuses = [
  {
    label: "Pending",
    count: 12,
    icon: Clock,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    label: "Preparing",
    count: 8,
    icon: ChefHat,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Completed",
    count: 136,
    icon: CheckCircle2,
    color: "text-success",
    bgColor: "bg-success/10",
  },
]

export function OrderStatus() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground">Order Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {orderStatuses.map((status) => (
          <div key={status.label} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${status.bgColor}`}>
              <status.icon className={`h-6 w-6 ${status.color}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{status.label}</p>
              <p className="text-2xl font-bold text-foreground">{status.count}</p>
            </div>
          </div>
        ))}
        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Avg. Prep Time</span>
            <span className="font-medium text-foreground">18 min</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
