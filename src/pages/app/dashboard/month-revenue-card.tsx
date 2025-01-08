import { getMonthRevenue } from "@/api/get-month-revenue.ts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card.tsx";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";

const MonthRevenueCard = () => {
  const { data: getMonthRevenueFn } = useQuery({
    queryKey: ["metrics", "month-revenue"],
    queryFn: getMonthRevenue,
  });
  return (
    <>
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className=" font-semibold text-base">
            Receita total (mês)
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1">
          <span className="text-2xl font-bold tracking-tight">
            {" "}
            {getMonthRevenueFn &&
              (getMonthRevenueFn?.receipt / 100).toLocaleString("pt-BR", {
                style: "currency",
                currency: "EUR",
              })}
          </span>
          {getMonthRevenueFn && (
            <p className="text-sm text-muted-foreground">
              {getMonthRevenueFn?.diffFromLastMonth < 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {" "}
                    {getMonthRevenueFn?.diffFromLastMonth.toLocaleString(
                      "pt-BR"
                    )}
                    %
                  </span>{" "}
                  em relação ao mês passado
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {" "}
                    {getMonthRevenueFn?.diffFromLastMonth.toLocaleString(
                      "pt-BR"
                    )}
                    %
                  </span>{" "}
                  em relação ao mês passado
                </>
              )}
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default MonthRevenueCard;
