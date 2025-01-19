import {
  getDailyRevenueInPeriod,
  GetDailyRevenueInPeriodResponse,
} from "@/api/get-daily-revenue-in-period";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useState } from "react";
import { DateRange } from "react-day-picker";

import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
} from "recharts";
import { subDays } from "date-fns";

const RevenueChart = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const { data: dailyRevenueInPeriodfn } =
    useQuery<GetDailyRevenueInPeriodResponse>({
      queryKey: ["metrics", "daily-revenue-in-period", dateRange],
      queryFn: () =>
        getDailyRevenueInPeriod({
          from: dateRange?.from,
          to: dateRange?.to,
        }),
      onSuccess: (data: GetDailyRevenueInPeriodResponse) => {
        console.log("Dados recebidos:", data);
      },
      onError: (error: any) => {
        console.error(
          "Erro na requisição:",
          error.response || error.message || error
        );
      },
    } as UseQueryOptions<GetDailyRevenueInPeriodResponse, Error>);

  return (
    <>
      <Card className="col-span-6">
        <CardHeader className="flex-row items-center justify-between pb-8">
          <div className="space-y-1">
            <CardTitle className="text-base fornt-medium">
              Receita no período
            </CardTitle>
            <CardDescription>Receita diária no período</CardDescription>
          </div>
          <div className="flex items-center gap-3 ">
            <label>Período</label>
            <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
          </div>
        </CardHeader>
        <CardContent>
          {dailyRevenueInPeriodfn && (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={dailyRevenueInPeriodfn} style={{ fontSize: 12 }}>
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  dy={16}
                />
                <YAxis
                  stroke="#888"
                  axisLine={false}
                  tickLine={false}
                  width={80}
                  tickFormatter={(value: number) =>
                    value.toLocaleString("pt-PT", {
                      style: "currency",
                      currency: "EUR",
                    })
                  }
                  dx={-16}
                />

                <Tooltip />
                <CartesianGrid vertical={false} className="stroke-muted" />

                <Line
                  type="linear"
                  strokeWidth={2}
                  dataKey="receipt"
                  stroke="#3249de"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default RevenueChart;
