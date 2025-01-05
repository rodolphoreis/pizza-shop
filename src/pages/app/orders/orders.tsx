import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";

import { Helmet } from "react-helmet-async";
import OrderTableRow from "./order-table-row.tsx";
import OrderTableFilters from "./order-table-filters.tsx";
import Pagination from "@/components/pagination.tsx";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/get-orders.ts";

const Orders = () => {
  const { data: result } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders({ pageIndex: 0 }),
  });
  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Realizado há</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[140px]">Total de pedido</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result &&
                  result.orders.map((order) => (
                    <OrderTableRow key={order.orderId} order={order} />
                  ))}
              </TableBody>
            </Table>
          </div>
          <Pagination pageIndex={0} totalCount={105} perPage={10} />
        </div>
      </div>
    </>
  );
};

export default Orders;
