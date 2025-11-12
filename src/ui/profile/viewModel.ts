import FormRegisterSeller, {
  SellerPropsModel,
} from "@/models/seller/types/seller-props-model";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function useProfileModel() {
  const [seller, setSeller] = useState<SellerPropsModel>();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegisterSeller>();

  const createOnSubmitEdit: SubmitHandler<FormRegisterSeller> = async (
    formData
  ) => {
    try {
      setLoading(true);
      await editSeller(formData);
      await fetchSeller();
    } catch (error) {
      const err = error as Error;
      setMessage(err.message);
    }
  };

  const fetchSeller = async () => {
    const id = localStorage.getItem("seller_id");
    try {
      setLoading(true);
      const resp = await fetch(`/api/sellers?id=${id}`, {
        headers: { "Content-Type": "application/json" },
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(`${data.message || resp.status}`);
      setSeller(data.data);
      setMessage(null);
    } catch (error) {
      const err = error as Error;
      setMessage(err.message);
      throw err.message;
    } finally {
      setLoading(false);
    }
  };

  const editSeller = async ({
    celular,
    cnpj,
    email,
    nome,
    senha,
  }: FormRegisterSeller) => {
    const id = localStorage.getItem("seller_id");
    try {
      setLoading(true);
      const resp = await fetch(`/api/sellers/edit?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ celular, cnpj, email, nome, senha }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        setMessage(data.message);
        throw new Error(`${data.message || resp.status}`);
      }
      return data;
    } catch (error) {
      const err = error as Error;
      setMessage(err.message);
      throw new Error(`${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeller();
  }, []);

  return {
    seller,
    loading,
    register,
    handleSubmit,
    createOnSubmitEdit,
    errors,
    message,
    setMessage,
  };
}
