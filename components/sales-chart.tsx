"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const dailyData = [
  { name: "9AM", sales: 1200, revenue: 1400 },
  { name: "11AM", sales: 1900, revenue: 2100 },
  { name: "1PM", sales: 2800, revenue: 3200 },
  { name: "3PM", sales: 2400, revenue: 2800 },
  { name: "5PM", sales: 3100, revenue: 3600 },
  { name: "7PM", sales: 3800, revenue: 4200 },
  { name: "9PM", sales: 2600, revenue: 3000 },
]

const weeklyData = [
  { name: "Mon", sales: 12000, revenue: 14500 },
  { name: "Tue", sales: 15000, revenue: 17200 },
  { name: "Wed", sales: 14200, revenue: 16800 },
  { name: "Thu", sales: 16800, revenue: 19500 },
  { name: "Fri", sales: 21000, revenue: 24200 },
  { name: "Sat", sales: 24500, revenue: 28100 },
  { name: "Sun", sales: 19800, revenue: 22800 },
]

const monthlyData = [
  { name: "Week 1", sales: 45000, revenue: 52000 },
  { name: "Week 2", sales: 52000, revenue: 61000 },
  { name: "Week 3", sales: 48000, revenue: 56000 },
  { name: "Week 4", sales: 58000, revenue: 68000 },
]

type TimeRange = "daily" | "weekly" | "monthly"

const dataMap: Record<TimeRange, typeof dailyData> = {
  daily: dailyData,
  weekly: weeklyData,
  monthly: monthlyData,
}

export function SalesChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("daily")

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">
          Sales & Revenue
        </CardTitle>

        <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
          {(["daily", "weekly", "monthly"] as const).map((range) => (
            <Button
              key={range}
              size="sm"
              variant="ghost"
              onClick={() => setTimeRange(range)}
              className={`h-7 px-3 text-xs capitalize transition-all ${
                timeRange === range
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {range}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="h-70">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataMap[timeRange]}>
              <CartesianGrid
                vertical={false}
                stroke="var(--border)"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                fontSize={12}
                stroke="var(--muted-foreground)"
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                fontSize={12}
                stroke="var(--muted-foreground)"
                tickFormatter={(value) =>
                  value >= 1000 ? `$${value / 1000}k` : `$${value}`
                }
              />

              <Tooltip
                cursor={{ stroke: "var(--border)" }}
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "var(--muted-foreground)" }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />

              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ paddingBottom: 12 }}
                formatter={(value) => (
                  <span className="text-xs text-muted-foreground capitalize">
                    {value}
                  </span>
                )}
              />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5 }}
              />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--secondary-foreground)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
