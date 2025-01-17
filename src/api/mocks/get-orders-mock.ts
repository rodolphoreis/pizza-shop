import { http, HttpResponse } from "msw";
import { GetOrdersResponse } from "../get-orders";

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
  "/orders",
  () => {
    return HttpResponse.json({
      orders: [
        {
          orderId: "1sbfg54h6tbgr",
          createdAt: new Date("2025-01-17T10:30:00Z"),
          status: "pending",
          customerName: "João Silva",
          total: 4215,
        },
        {
          orderId: "2dbae45yghtreb",
          createdAt: new Date("2025-01-17T11:00:00Z"),
          status: "processing",
          customerName: "Maria Oliveira",
          total: 3750,
        },
        {
          orderId: "3gweg45y4ghgte",
          createdAt: new Date("2025-01-17T11:45:00Z"),
          status: "delivering",
          customerName: "Carlos Souza",
          total: 5025,
        },
        {
          orderId: "44erhgedhergh3",
          createdAt: new Date("2025-01-17T12:15:00Z"),
          status: "delivering",
          customerName: "Ana Paula",
          total: 2223,
        },
        {
          orderId: "5rhbednhe55hgf",
          createdAt: new Date("2025-01-17T13:30:00Z"),
          status: "delivered",
          customerName: "Lucas Pereira",
          total: 1070,
        },
      ],
      meta: {
        pageIndex: 1,
        perPage: 5,
        totalCount: 5,
      },
    });
  }
);
