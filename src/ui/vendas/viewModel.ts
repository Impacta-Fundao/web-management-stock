'use client'
import { VendasData } from "@/models/vendas/types/vendas-props-model";
import { useEffect, useState } from "react";

export default function useVendasModel() {
  const [venda, setVenda] = useState<Array<VendasData>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getVendas = async (): Promise<VendasData[]> => {
    try {
      setLoading(true);
      const data = await fetch("/api/vendas/get", {
        headers: { "Content-Type": "application/json" },
      });
      const result = await data.json();
      if (!data.ok) throw new Error(`${result.message || data.status}`);
      setVenda(result.data);
      return result;
    } catch (error) {
      const err = error as Error;
      console.error("Erro ao carregar Vendas", err.message);
      return [];
    } finally {
        setLoading(false)
    }
  };

  useEffect(() => {
    getVendas();
  }, []);

  return { loading, venda, getVendas };
}


