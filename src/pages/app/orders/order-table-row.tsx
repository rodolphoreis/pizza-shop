import { Button } from "@/components/ui/button.tsx";
import { TableCell, TableRow } from "@/components/ui/table.tsx";
import { ArrowRight, Search, X } from "lucide-react";

const OrderTableRow = () => {
  return (
    <>
      <TableRow>
        <TableCell>
          <Button variant="outline" size="xs">
            <Search className="w-3 h-3" />
            <span className="sr-only">Detalhes do pedido</span>
          </Button>
        </TableCell>
        <TableCell className="font-mono text-xs font-medium">
          123456789
        </TableCell>
        <TableCell>há 15 minutos</TableCell>
        <TableCell>
          <div className="flex items-center gap-2 ">
            <span className="h-2 w-2 rounded-full bg-slate-400" />
            <span className="font-medium text-muted-foreground">Pedente</span>
          </div>
        </TableCell>
        <TableCell className="font-medium">Rodolpho Reis</TableCell>
        <TableCell className="font-medium">123 €</TableCell>
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
