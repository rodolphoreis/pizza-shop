import { Button } from "@/components/ui/button.tsx";
import { Dialog, DialogTrigger } from "@/components/ui/dialog.tsx";
import { TableCell, TableRow } from "@/components/ui/table.tsx";
import { ArrowRight, Search, X } from "lucide-react";

import OrderDetails from "./order-details.tsx";
import { OrderStatus } from "@/components/orders-status.tsx";

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

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
  return (
    <>
      <TableRow>
        <TableCell>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="xs">
                <Search className="w-3 h-3" />
                <span className="sr-only">Detalhes do pedido</span>
              </Button>
            </DialogTrigger>
            <OrderDetails />
          </Dialog>
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          {order.orderId}
        </TableCell>
        <TableCell>
          {formatDistanceToNow(order.createdAt, {
            locale: ptBR,
            addSuffix: true,
          })}
        </TableCell>
        <TableCell>
          <OrderStatus status={order.status} />
        </TableCell>
        <TableCell className="font-medium">{order.customerName}</TableCell>
        <TableCell className="font-medium">
          {order.total.toLocaleString("pt-PT", {
            style: "currency",
            currency: "EUR",
          })}
        </TableCell>
        <TableCell>
          <Button variant="outline" size="xs">
            <ArrowRight className="mr-2 w-3 h-3" />
            Aprovar
          </Button>
        </TableCell>
        <TableCell>
          <Button variant="ghost" size="xs">
            <X className="mr-2 w-3 h-3" />
            Cancelar
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderTableRow;
