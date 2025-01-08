import { getDayOrdersAmount } from "@/api/get-day-orders-amount.ts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card.tsx";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";

const DayOrdersAmountCard = () => {
  const { data: dayOrdersAmountFn } = useQuery({
    queryKey: ["metrics", "day-orders-amount"],
    queryFn: getDayOrdersAmount,
  });

  return (
    <>
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className=" font-semibold text-base">
            Pedidos (dia)
          </CardTitle>
          <Utensils className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-1">
          {dayOrdersAmountFn && (
            <>
              <span className="text-2xl font-bold tracking-tight">
                {dayOrdersAmountFn.amount.toLocaleString("pt-BR")}
              </span>
              <p className="text-sm text-muted-foreground">
                {dayOrdersAmountFn.diffFromYesterday >= 0 ? (
                  <>
                    <span className="text-emerald-500 dark:text-emerald-400">
                      +{dayOrdersAmountFn.diffFromYesterday}%
                    </span>{" "}
                    em relação a ontem
                  </>
                ) : (
                  <>
                    <span className="text-rose-500 dark:text-rose-400">
                      {dayOrdersAmountFn.diffFromYesterday}%
                    </span>{" "}
                    em relação a ontem
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

export default DayOrdersAmountCard;
