export type OrderStatus =
  | "pending"
  | "canceled"
  | "processing"
  | "delivering"
  | "delivered";

interface OrderStatusProps {
  status: OrderStatus;
}

const orderStatusMap: Record<OrderStatus, string> = {
  pending: "Pedente",
  canceled: "Cancelado",
  processing: "Processando",
  delivering: "Entregando",
  delivered: "Entregue",
};

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2 ">
      {status === "pending" && (
        <span className="h-2 w-2 rounded-full bg-slate-400" />
      )}
      {status === "canceled" && (
        <span className="h-2 w-2 rounded-full bg-red-500" />
      )}
      {status === "processing" && (
        <span className="h-2 w-2 rounded-full bg-yellow-500" />
      )}
      {status === "delivering" && (
        <span className="h-2 w-2 rounded-full bg-blue-500" />
      )}
      {status === "delivered" && (
        <span className="h-2 w-2 rounded-full bg-green-500" />
      )}

      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  );
}
