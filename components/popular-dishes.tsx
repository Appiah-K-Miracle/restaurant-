"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const dishes = [
  {
    name: "Grilled Salmon",
    orders: 48,
    status: "in-stock",
    image: "/grilled-salmon-dish.jpg",
  },
  {
    name: "Wagyu Steak",
    orders: 42,
    status: "low-stock",
    image: "/wagyu-steak-dish.jpg",
  },
  {
    name: "Truffle Pasta",
    orders: 38,
    status: "in-stock",
    image: "/truffle-pasta.png",
  },
  {
    name: "Caesar Salad",
    orders: 35,
    status: "in-stock",
    image: "/caesar-salad-dish.jpg",
  },
  {
    name: "Lobster Bisque",
    orders: 28,
    status: "out-of-stock",
    image: "/lobster-bisque.png",
  },
]

const statusConfig = {
  "in-stock": { label: "In Stock", className: "bg-success/10 text-success border-success/20" },
  "low-stock": { label: "Low Stock", className: "bg-warning/10 text-warning border-warning/20" },
  "out-of-stock": { label: "Out of Stock", className: "bg-destructive/10 text-destructive border-destructive/20" },
}

export function PopularDishes() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground">Popular Dishes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {dishes.map((dish) => {
          const status = statusConfig[dish.status as keyof typeof statusConfig]
          return (
            <div
              key={dish.name}
              className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <img
                src={dish.image || "/placeholder.svg"}
                alt={dish.name}
                className="h-12 w-12 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{dish.name}</p>
                <p className="text-sm text-muted-foreground">{dish.orders} orders today</p>
              </div>
              <Badge variant="outline" className={status.className}>
                {status.label}
              </Badge>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
