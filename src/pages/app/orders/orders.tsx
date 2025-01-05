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
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const Orders = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "0");

  const { data: result } = useQuery({
    queryKey: ["orders", pageIndex],
    queryFn: () => getOrders({ pageIndex }),
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
          {result && (
            <Pagination
              onPageChange={(pageIndex) => {
                setSearchParams({ page: (pageIndex + 1).toString() });
              }}
              pageIndex={result.meta.pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
