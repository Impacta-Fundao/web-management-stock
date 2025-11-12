import { ProdutosData } from "@/models/produtos/types/produtos-props-mpdel";
import { VendasRegister } from "@/models/vendas/types/vendas-props-model";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

export default function useRegisterVendasModel() {
  const [produto, setProduto] = useState<Array<ProdutosData>>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const { register, handleSubmit } = useForm<VendasRegister>();

  const onSubmiteRegisterVendas: SubmitHandler<VendasRegister> = async (
    formVenda
  ) => {
    const resp = await postVenda(formVenda);
    try {
      setLoading(true);
      await getProducts()
    } catch (error) {
      setError(resp);
      console.error("Erro no onSubmitRgisterVendas", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  const apiRequest = useCallback(
    async (url: string, options: RequestInit = {}) => {
      setError(null);
      try {
        const resp = await fetch(url, {
          credentials: "include",
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
        });

        if (resp.status === 401) {
          router.push("/");
          return;
        }

        if (!resp.ok) {
          throw new Error(`Erro ${resp.status}`);
        }

        return await resp.json();
      } catch (error) {
        const err =
          error instanceof Error ? error.message : "Erro desconhecido";
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const getProducts = useCallback(async (): Promise<ProdutosData[]> => {
    try {
        
      const data = await apiRequest("/api/produtos/get");
      setProduto(data.data);
      
      return data.data;
    } catch (error) {
      console.error("Erro ao carregar produtos: ", error);
      return [];
    }
  }, [apiRequest]);

  async function postVenda({ produtoId, quantidade }: VendasRegister) {
    try {
      const resp = await fetch("/api/vendas/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ produtoId, quantidade:Number(quantidade) }),
      });
      const result = await resp.json();
      if (!resp.ok) {
        setError(result.message || resp.status);
        console.error(error);
        throw new Error(`${error || resp.status}`);
      }
      return result;
    } catch (error) {
      const err = error as Error;
      setError(err.message);
      throw new Error(`${err.message}`);
    }
  }

  return {
    produto,
    loading,
    error,
    register,
    handleSubmit,
    onSubmiteRegisterVendas,
  };
}
