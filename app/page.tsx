import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { KPICards } from "@/components/kpi-cards"
import { PopularDishes } from "@/components/popular-dishes"
import { OrderStatus } from "@/components/order-status"
import { SalesChart } from "@/components/sales-chart"
import { OrderTypeChart } from "@/components/order-type-chart"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
    
      <div className="flex-1 flex flex-col ml-16">
       
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          <KPICards />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PopularDishes />
            <OrderStatus />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SalesChart />
            </div>
            <OrderTypeChart />
          </div>
        </main>
      </div>
    </div>
  )
}
