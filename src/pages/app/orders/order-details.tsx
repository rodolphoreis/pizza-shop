import { getOrderDetails } from "@/api/get-orders-details.ts";
import { OrderStatus } from "@/components/orders-status.tsx";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export interface OrderDetailsProps {
  orderId: string;
  open: boolean;
}

const OrderDetails = ({ orderId, open }: OrderDetailsProps) => {
  const { data: order } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderDetails({ orderId }),
    enabled: open,
  });

  return (
    <DialogContent>
      <DialogHeader className="space-y-1">
        <DialogTitle>Detalhes do pedido</DialogTitle>
        <DialogTitle className="text-sm text-muted-foreground">
          Pedido: {orderId}
        </DialogTitle>
      </DialogHeader>
      {order && (
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  <OrderStatus status={order.status} />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">Cliente</TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2 ">
                    <span className="font-medium text-muted-foreground">
                      {order.customer.name}
                    </span>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Telefone
                </TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2 ">
                    <span className="font-medium text-muted-foreground">
                      {order.customer.phone || "Não informado"}
                    </span>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">E-mail</TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2 ">
                    <span className="font-medium text-muted-foreground">
                      {order.customer.email}
                    </span>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Realizado há
                </TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2 ">
                    <span className="font-medium text-muted-foreground">
                      {formatDistanceToNow(order.createdAt, { locale: ptBR })}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(order.orderItems) &&
                order.orderItems.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.product.name}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        {(item.priceInCents / 100).toLocaleString("pt-PT", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        {(
                          (item.priceInCents * item.quantity) /
                          100
                        ).toLocaleString("pt-PT", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total do pedido</TableCell>
                <TableCell className="text-right font-medium">
                  {(order.totalInCents / 100).toLocaleString("pt-PT", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}
    </DialogContent>
  );
};

export default OrderDetails;
