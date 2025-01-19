import { http, HttpResponse } from "msw";
import {
  GetOrdersDetailsParams,
  GetOrdersDetailsResponse,
} from "../get-orders-details";

export const getOrdersDetailsMock = http.get<
  GetOrdersDetailsParams,
  never,
  GetOrdersDetailsResponse
>("/orders/:orderId", async ({ params }) => {
  const order = Array.from({ length: 60 }).map((_, i) => {
    return {
      orderId: `order-${i + 1}`,
      createdAt: new Date(),
      status: ["pending", "canceled", "processing", "delivering", "delivered"][
        i % 5
      ],
      customerName: `Customer ${i + 1}`,
      total: Math.floor(Math.random() * 1000) + 100,
    };
  });

  const filteredOrder = order.find((order) => order.orderId === params.orderId);

  if (!filteredOrder) {
    throw new Error(`Order not found: ${params.orderId}`);
  }

  return HttpResponse.json({
    id: filteredOrder.orderId,

    status: filteredOrder.status as
      | "pending"
      | "canceled"
      | "processing"
      | "delivering"
      | "delivered",
    createdAt: filteredOrder.createdAt.toString(),
    totalInCents: filteredOrder.total,
    customer: {
      name: filteredOrder.customerName,
      email: "johndoe@test.com",
      phone: "12345",
    },
    orderItems: [
      {
        id: params.orderId,
        priceInCents: 1000,
        quantity: 2,
        product: {
          name: "Quatro Queijos",
        },
      },
      {
        id: params.orderId,
        priceInCents: 2000,
        quantity: 1,
        product: {
          name: "Pepperoni",
        },
      },
    ],
  });
});
