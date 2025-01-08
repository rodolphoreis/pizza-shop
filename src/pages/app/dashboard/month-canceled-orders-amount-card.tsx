import { getMonthCanceledOrdersAmount } from "@/api/get-month-canceled-orders-amount.ts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card.tsx";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";

const MonthCanceledOrdersAmountCard = () => {
  const { data: getMonthCanceledOrdersAmountFn } = useQuery({
    queryKey: ["metrics", "month-calceled-orders-amount"],
    queryFn: getMonthCanceledOrdersAmount,
  });

  return (
    <>
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className=" font-semibold text-base">
            Cancelamentos (mês)
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1">
          <span className="text-2xl font-bold tracking-tight">
            {" "}
            {getMonthCanceledOrdersAmountFn?.amount}
          </span>
          <p className="text-sm text-muted-foreground">
            {getMonthCanceledOrdersAmountFn &&
            getMonthCanceledOrdersAmountFn?.diffFromLastMonth < 0 ? (
              <>
                <span className="text-emerald-500 dark:text-emerald-400">
                  {" "}
                  {getMonthCanceledOrdersAmountFn?.diffFromLastMonth.toLocaleString(
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
                  +
                  {getMonthCanceledOrdersAmountFn?.diffFromLastMonth.toLocaleString(
                    "pt-BR"
                  )}
                  %
                </span>{" "}
                em relação ao mês passado
              </>
            )}
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default MonthCanceledOrdersAmountCard;
