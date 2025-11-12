import { ProdutosFormRegister } from "@/models/produtos/types/produtos-props-mpdel";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function useProdutosRegister() {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ProdutosFormRegister>();

  const onSubmiteRegisterProduct: SubmitHandler<ProdutosFormRegister> = async (
    formProdutos
  ) => {
    const resp = await postProduct(formProdutos);
    try {
      setLoading(true);
      setMessage(resp);
    } catch (error) {
      setMessage(resp);
      console.error("Erro no onSubmitRegisterProduct", error);
    } finally {
      setLoading(false);
    }
  };

  async function postProduct({
    imagem,
    nome,
    preco,
    quantidade,
  }: ProdutosFormRegister) {
    try {
      const resp = await fetch("/api/produtos/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imagem: String(imagem),
          nome,
          preco: Number(preco),
          quantidade: Number(quantidade),
        }),
      });
      const result = await resp.json();
      if (!resp.ok) {
        throw new Error(`Erro ${result.message || resp.status}`);
      }
      return result.message;
    } catch (error) {
      const err = error as Error;
      console.error("Erro ao authenticar ", err.message);
      throw error;
    }
  }

  return {
    register,
    onSubmiteRegisterProduct,
    handleSubmit,
    postProduct,
    loading,
    message,
    errors,
  };
}
