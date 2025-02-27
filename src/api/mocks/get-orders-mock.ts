import { http, HttpResponse } from "msw";
import type { GetOrdersResponse } from "../get-orders";

type Orders = GetOrdersResponse["orders"];
type OrderStatus = GetOrdersResponse["orders"][number]["status"];

const statuses: OrderStatus[] = [
  "pending",
  "canceled",
  "processing",
  "delivering",
  "delivered",
];

const order: Orders = Array.from({ length: 60 }).map((_, i) => {
  return {
    orderId: `order-${i + 1}`,
    createdAt: new Date(),
    status: statuses[i % 5],
    customerName: `Customer ${i + 1}`,
    total: Math.floor(Math.random() * 1000) + 100,
  };
});

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
  "/orders",
  async ({ request }) => {
    const { searchParams } = new URL(request.url);

    const pageIndex = searchParams.get("pageIndex")
      ? Number(searchParams.get("pageIndex"))
      : 0;

    const orderId = searchParams.get("orderId");
    const customerName = searchParams.get("customerName");
    const status = searchParams.get("status");

    let filteredOrders = order;

    if (customerName) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.includes(customerName)
      );
    }

    if (orderId) {
      filteredOrders = filteredOrders.filter((order) =>
        order.orderId.includes(orderId)
      );
    }

    if (status) {
      filteredOrders = filteredOrders.filter(
        (order) => order.status === status
      );
    }

    const paginateOrders = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10
    );

    return HttpResponse.json({
      orders: paginateOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: filteredOrders.length,
      },
    });
  }
);
