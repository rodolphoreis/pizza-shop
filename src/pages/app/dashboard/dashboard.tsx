import { Helmet } from "react-helmet-async";
import MonthRevenueCard from "./month-revenue-card.tsx";
import MonthOrdersAmountCard from "./month-orders-amount-card.tsx";
import DayOrdersAmountCard from "./day-orders-amount-card.tsx";
import MonthCanceledOrdersAmountCard from "./month-canceled-orders-amount-card.tsx";
import RevenueChart from "./revenue-chart.tsx";
import PopularProductsChart from "./popular-products-chart.tsx";

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <DayOrdersAmountCard />
          <MonthCanceledOrdersAmountCard />
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-9">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </>
  );
}
