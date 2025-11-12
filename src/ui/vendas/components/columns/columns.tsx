"use client";
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
import { VendasData } from "@/models/vendas/types/vendas-props-model";
import { ColumnDef } from "@tanstack/react-table";
import { Check, MoreHorizontal, X } from "lucide-react";
import { redirect } from "next/navigation";

export const columns: ColumnDef<VendasData>[] = [
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
];
