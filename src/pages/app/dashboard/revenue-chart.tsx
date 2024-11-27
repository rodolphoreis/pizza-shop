import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
} from "recharts";

const data = [
  {
    date: "10/12",
    revenue: 1234,
  },
  {
    date: "11/12",
    revenue: 1567,
  },
  {
    date: "12/12",
    revenue: 90,
  },
  {
    date: "13/12",
    revenue: 2210,
  },
  {
    date: "14/12",
    revenue: 1530,
  },
  {
    date: "15/12",
    revenue: 1800,
  },
  {
    date: "16/12",
    revenue: 730,
  },
];

const RevenueChart = () => {
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
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={data} style={{ fontSize: 12 }}>
              <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
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
                dataKey="revenue"
                stroke="#3249de"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default RevenueChart;
