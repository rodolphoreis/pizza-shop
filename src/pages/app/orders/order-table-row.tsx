import { Button } from "@/components/ui/button.tsx";
import { Dialog, DialogTrigger } from "@/components/ui/dialog.tsx";
import { TableCell, TableRow } from "@/components/ui/table.tsx";
import { ArrowRight, Search, X } from "lucide-react";

import OrderDetails from "./order-details.tsx";
import { OrderStatus } from "@/components/orders-status.tsx";

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/cancel-order.ts";
import { GetOrdersResponse } from "@/api/get-orders.ts";
import { approveOrder } from "@/api/approve-order.ts";
import { deliverOrder } from "@/api/deliver-order.ts";
import { dispatchOrder } from "@/api/dispatch-order.ts";

export interface OrderTableRowProps {
  order: {
    orderId: string;
    createdAt: Date;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  };
}

const OrderTableRow = ({ order }: OrderTableRowProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const queryClient = useQueryClient();

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ["orders"],
    });
    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return;
      }
      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return {
              ...order,
              status,
            };
          }
          return order;
        }),
      });
    });
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "canceled");
      },
    });

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "processing");
      },
    });

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "delivering");
      },
    });

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "delivered");
      },
    });

  return (
    <>
      <TableRow>
        <TableCell>
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Search className="w-3 h-3" />
                <span className="sr-only">Detalhes do pedido</span>
              </Button>
            </DialogTrigger>
            <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
          </Dialog>
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          {order.orderId}
        </TableCell>
        <TableCell>
          {(() => {
            const createdAt = new Date(order.createdAt);
            if (isNaN(createdAt.getTime())) {
              console.error("Data inválida:", order.createdAt);
              return <span>Erro na data</span>;
            }

            const formattedDate = formatDistanceToNow(createdAt, {
              locale: ptBR,
            });
            return (
              <span className="font-medium text-muted-foreground">
                {formattedDate}
              </span>
            );
          })()}
        </TableCell>
        <TableCell>
          <OrderStatus status={order.status} />
        </TableCell>
        <TableCell className="font-medium">{order.customerName}</TableCell>
        <TableCell className="font-medium">
          {(order.total / 100).toLocaleString("pt-PT", {
            style: "currency",
            currency: "EUR",
          })}
        </TableCell>
        <TableCell>
          {order.status === "pending" && (
            <Button
              onClick={() => approveOrderFn({ orderId: order.orderId })}
              disabled={isApprovingOrder}
              variant="outline"
            >
              <ArrowRight className="mr-2 w-3 h-3" />
              Aprovar
            </Button>
          )}

          {order.status === "processing" && (
            <Button
              onClick={() => dispatchOrderFn({ orderId: order.orderId })}
              disabled={isDispatchingOrder}
              variant="outline"
            >
              <ArrowRight className="mr-2 w-3 h-3" />
              Em entrega
            </Button>
          )}

          {order.status === "delivering" && (
            <Button
              onClick={() => deliverOrderFn({ orderId: order.orderId })}
              disabled={isDeliveringOrder}
              variant="outline"
            >
              <ArrowRight className="mr-2 w-3 h-3" />
              Entregue
            </Button>
          )}
        </TableCell>
        <TableCell>
          <Button
            disabled={
              !["pending", "processing"].includes(order.status) ||
              isCancelingOrder
            }
            onClick={() => cancelOrderFn({ orderId: order.orderId })}
            variant="ghost"
          >
            <X className="mr-2 w-3 h-3" />
            Cancelar
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderTableRow;
