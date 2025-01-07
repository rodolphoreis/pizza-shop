import { getMonthOrdersAmount } from "@/api/get-month-orders-amount.ts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card.tsx";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";

const MonthOrdersAmountCard = () => {
  const { data: monthOrdersAmountFn } = useQuery({
    queryKey: ["metrics", "month-orders-amount"],
    queryFn: getMonthOrdersAmount,
  });

  return (
    <>
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className=" font-semibold text-base">
            Pedidos (mês)
          </CardTitle>
          <Utensils className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1">
          {monthOrdersAmountFn && (
            <>
              <span className="text-2xl font-bold tracking-tight">
                {" "}
                {monthOrdersAmountFn.amount}
              </span>
              <p className="text-sm text-muted-foreground">
                {monthOrdersAmountFn.diffFromLastMonth >= 0 ? (
                  <>
                    <span className="text-emerald-500 dark:text-emerald-400">
                      +{monthOrdersAmountFn.diffFromLastMonth}%
                    </span>{" "}
                    em relação ao mês passado
                  </>
                ) : (
                  <>
                    <span className="text-rose-500 dark:text-rose-400">
                      -{monthOrdersAmountFn.diffFromLastMonth}%
                    </span>{" "}
                    em relação ao mês passado
                  </>
                )}
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default MonthOrdersAmountCard;
