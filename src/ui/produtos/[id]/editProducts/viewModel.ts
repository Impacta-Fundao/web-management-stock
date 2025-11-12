import { ProdutosFormRegister } from "@/models/produtos/types/produtos-props-mpdel";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function useEditProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProdutosFormRegister>();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);


  const createOnSubmitEdit = (
    id: string
  ): SubmitHandler<ProdutosFormRegister> => {
    return async (data) => {
      try {
        setLoading(true);
        await editProduct(data, id);
      } catch (error) {
        console.error("Erro ao submeter");
      } finally {
        setLoading(false);
      }
    };
  };

  async function editProduct({imagem,nome,preco,quantidade}: ProdutosFormRegister, id: string) {
    try {
      setMessage(null);
      const response = await fetch(`/api/produtos/editPatch?id=${id}`, {
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
        body: JSON.stringify({imagem:String(imagem),nome:String(nome),preco:Number(preco),quantidade:Number(quantidade)}),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Error - ${data.message || response.status} `);
      }
    } catch (error) {
      const err = error as Error;
      setMessage(`Erro - ${err.message}`);
      console.error("Erro na aplicação");
    }
  }
  return {
    register,
    handleSubmit,
    createOnSubmitEdit,
    loading,
    message,
    editProduct,
    errors,
  };
}
