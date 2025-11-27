import { Button } from "@/components/ui/button";
import { VendasData } from "@/models/vendas/types/vendas-props-model";
import { ColumnDef } from "@tanstack/react-table";
import { X } from "lucide-react";

// Interface para as props das colunas
export interface ColumnsProps {
  onInactivate: (id: string) => void;
}

export const getColumns = ({
  onInactivate,
}: ColumnsProps): ColumnDef<VendasData>[] => [
  {
    accessorKey: "id",
    header: "Ordem",
  },
  {
    accessorKey: "data_venda",
    header: "Data da Venda",
  },
  {
    accessorKey: "preco_venda",
    header: "Preço da Venda",
    cell: ({ row }) => {
      const preco = row.getValue("preco_venda") as number;
      return `R$${preco.toFixed(2)}`;
    },
  },
  {
    accessorKey: "produto_id",
    header: "Id do Produto",
  },
  {
    accessorKey: "quantidade",
    header: "Quantidade de Produtos",
  },
  {
    accessorKey: "total_venda",
    header: "Valor total da venda",
    cell: ({ row }) => {
      const preco = row.getValue("total_venda") as number;
      return `R$${preco.toFixed(2)}`;
    },
  },
  { accessorKey: "status", header: "Status" },
  {
    id: "Inativar",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <Button
          onClick={() => onInactivate(String(row.original.id))}
          variant={"destructive"}
          className="cursor-pointer"
        >
          <X />
          Inativar
        </Button>
      );
    },
  },
];
