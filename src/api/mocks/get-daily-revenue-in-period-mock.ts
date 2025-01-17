import { http, HttpResponse } from "msw";
import { GetDailyRevenueInPeriodResponse } from "../get-daily-revenue-in-period";
export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>("/metrics/daily-receipt-in-period", () => {
  return HttpResponse.json([
    { data: "01/01/2024", receipt: 2000 },
    { data: "03/01/2024", receipt: 8000 },
    { data: "02/01/2024", receipt: 800 },
    { data: "04/01/2024", receipt: 3540 },
    { data: "05/01/2024", receipt: 8900 },
    { data: "06/01/2024", receipt: 200 },
    { data: "07/01/2024", receipt: 1500 },
  ]);
});
