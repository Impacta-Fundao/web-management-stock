import { LoginProps } from "@/models/auth/types/auth-login-props-model";
import FormRegisterSeller, {
  SellerPropsModel,
} from "@/models/seller/types/seller-props-model";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function useLoginModel() {
  const route = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    reset,
    formState: { errors: errosLogin },
  } = useForm<LoginProps>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormRegisterSeller>();

  async function fetchAuth(email: string, senha: string) {
    try {
      const resp = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });
      if (!resp.ok) {
        setMessage(`Falha no login ${resp.status}`);
        throw new Error(`Erro ${resp.status}`);
      }
      const result = await resp.json();
      return result;
    } catch (error) {
      const err = error as Error;
      console.error("Erro ao authenticar ", err.message);
      throw error;
    }
  }

  const onSubmitSignIn: SubmitHandler<LoginProps> = async (formLogin) => {
    try {
      setLoading(true);
      await fetchAuth(formLogin.email, formLogin.senha);
      setMessage("Autenticação bem sucedida");
      route.push("/Seller");
    } catch (error) {
      setMessage("Erro ao enviar o dados");
      console.error("Erro no onSubmitSignIn", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmiteRegister: SubmitHandler<FormRegisterSeller> = async (
    formRegister
  ) => {
    try {
      setLoading(true);
      await postSeller(formRegister);
      setMessage("Conta criada com sucesso");

      route.push("/Verify");
    } catch (error) {
      setMessage("Erro ao enviar o dados");
      console.error("Erro no onSubmitRegister", error);
    } finally {
      setLoading(false);
      setMessage(null);
    }
  };

  const postSeller = useCallback(
    async ({ celular, cnpj, email, nome, senha }: FormRegisterSeller) => {
      const rawCNPJ = cnpj?.replace(/\D/g, "");
      const rawPhone = celular.replace(/\D/g, "");

      try {
        const data = await fetch("api/sellers/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            celular: rawPhone,
            cnpj: rawCNPJ,
            nome,
            senha,
          }),
        });
        if (!data.ok) {
          const errorData = await data.json();
          console.error("Erro da API:", errorData);
          throw new Error(
            errorData.message || `Erro na requisição: ${data.status}`
          );
        }
        const result = await data.json();
        if (typeof window !== "undefined") {
          localStorage.setItem("celular_para_verificar", rawPhone);
        }
        return result;
      } catch (error) {
        console.error("Erro no postSeller:", error);
        throw error;
      }
    },
    []
  );

  return {
    onSubmitSignIn,
    onSubmiteRegister,
    registerLogin,
    handleSubmitLogin,
    reset,
    errosLogin,
    errors,
    loading,
    register,
    handleSubmit,
    message,
    setValue,
  };
}
