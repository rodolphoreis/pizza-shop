import { api } from "@/lib/axios.ts";
import { format } from "date-fns";

export interface GetDailyRevenueInPeriodQuery {
  from?: Date;
  to?: Date;
}

export type GetDailyRevenueInPeriodResponse = {
  data: string;
  receipt: number;
}[];

export async function getDailyRevenueInPeriod({
  from,
  to,
}: GetDailyRevenueInPeriodQuery) {
  const formattedFrom = from ? format(from, "yyyy-MM-dd") : undefined;
  const formattedTo = to ? format(to, "yyyy-MM-dd") : undefined;

  const response = await api.get<GetDailyRevenueInPeriodResponse>(
    "/metrics/daily-receipt-in-period",
    {
      params: {
        from: formattedFrom,
        to: formattedTo,
      },
    }
  );

  return response.data;
}
