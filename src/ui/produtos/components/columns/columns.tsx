'use client'
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProdutosData } from "@/models/produtos/types/produtos-props-mpdel";
import { ColumnDef } from "@tanstack/react-table";
import { Check, MoreHorizontal, X } from "lucide-react";
import { redirect, } from "next/navigation";

export const columns: ColumnDef<ProdutosData>[] = [
  {
    accessorKey: "id",
    header: "Ordem",
  },
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "preco",
    header: "Preço",
    cell: ({ row }) => {
      const preco = row.getValue("preco") as number;
      return `R$${preco.toFixed(2)}`;
    },
  },
  {
    accessorKey: "quantidade",
    header: "Quantidade",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as boolean;
      return status ? (
        <Check className="text-green-600  bg-green-200 rounded-xs" />
      ) : (
        <X className="text-red-600 bg-red-200" />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => redirect(`/Produtos/${product.id}`)}
            >
              Ver dados do Produto
            </DropdownMenuItem>
            {/* <DropdownMenuItem onClick={() => deleteClient(String(user.id))}>
              Deletar cliente
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
