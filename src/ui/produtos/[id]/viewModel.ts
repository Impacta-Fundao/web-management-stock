import {
  ProdutosData,
  ProdutosFormRegister,
} from "@/models/produtos/types/produtos-props-mpdel";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

export default function usePreviewProduct(params: { id: string }) {
  const [data, setData] = useState<ProdutosData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>();
  const router = useRouter();

  async function fetchById() {
    try {
      setLoading(true);
      const resp = await fetch(`/api/produtos/getById?id=${params.id}`, {
        headers: { "Content-Type": "application/json" },
      });
      if (!resp.ok) {
        throw new Error(`Erro na requisição: ${resp.status}`);
      }
      const result = await resp.json();
      setData(result.data);
    } catch (error) {
      const err = error as Error;
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function activateProduct() {
    try {
      setLoading(true);
      const resp = await fetch(`/api/produtos/activate?id=${params.id}`, {
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
      });
      if (!resp.ok) {
        throw new Error(
          `Erro na requisição: ${resp.status} - ${await resp.json()}`
        );
      }
      const data = await resp.json();
      await fetchById();
      return data;
    } catch (error) {
      const err = error as Error;
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function inactivateProduct() {
    try {
      setLoading(true);
      const resp = await fetch(`/api/produtos/desactivate?id=${params.id}`, {
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
      });
      if (!resp.ok) {
        throw new Error(
          `Erro na requisição: ${resp.status} - ${await resp.json()}`
        );
      }
      const data = await resp.json();
      await fetchById();
      return data;
    } catch (error) {
      const err = error as Error;
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct() {
    try {
      setLoading(true);
      const resp = await fetch(`/api/produtos/delete?id=${params.id}`, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
      });
      if (!resp.ok) {
        throw new Error(
          `Erro na requisição: ${resp.status} - ${await resp.json()}`
        );
      }
      const data = await resp.json();

      router.push("/Produtos");
      return data;
    } catch (error) {
      const err = error as Error;
      console.log(err)
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchById();
  }, []);

  return {
    data,
    loading,
    message,
    activateProduct,
    inactivateProduct,
    deleteProduct,
  };
}
