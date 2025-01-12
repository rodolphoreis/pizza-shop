import { api } from "@/lib/axios.ts";

export interface GetOrdersQuery {
  pageIndex?: number | null;
  orderId?: string | null;
  customerName?: string | null;
  status?: string | null;
}

export interface GetOrdersResponse {
  orders: {
    orderId: string;
    createdAt: Date;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

export async function getOrders({
  pageIndex = 1,
  orderId = null,
  customerName = null,
  status = null,
}: GetOrdersQuery): Promise<GetOrdersResponse> {
  try {
    const response = await api.get<GetOrdersResponse>("/orders", {
      params: { pageIndex, orderId, customerName, status },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}
