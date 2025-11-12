import {
  ProdutosData,
  ProdutosFormRegister,
} from "@/models/produtos/types/produtos-props-mpdel";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function useProdutosModel() {
  const [produto, setProduto] = useState<Array<ProdutosData>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProdutosFormRegister>();

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

  return {
    loading,
    produto,
    getProducts,
    error,
    register,
    handleSubmit,
    errors,
    message,
  };
}
