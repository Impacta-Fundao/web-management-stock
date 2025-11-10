import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { VerifyCode } from "@/models/auth/types/auth-login-props-model";
import { useRouter } from "next/navigation";

export default function VerifyCodeModel() {
  const [celular, setCelular] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const route = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<VerifyCode>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const celularSalvo = localStorage.getItem("celular_para_verificar");
      if (celularSalvo) {
        setCelular(celularSalvo);
        console.log("Celular recuperado:", celularSalvo);
      } else {
        console.warn("Nenhum celular encontrado no localStorage");
        setMessage("Falha ao encontrar seu número. Faça o login novamente");
       
      }
    }
  }, [route]); // ← Adicionar route como dependência

  const onSubmitVerify = async (data: VerifyCode) => {
    console.log(data);
    try {
      setLoading(true);
      const resp = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, celular }),
      });
      if (!resp.ok) {
        console.error(resp.body);

        throw new Error(`Código inválido ${resp.status}`);
      }
      const result = await resp.json();
      setMessage(
        "Verificação bem sucedida! Estamos te redirecionando para se autenticar. Faça o login com suas credenciais cadastradas"
      );
      console.log("Verificação bem-sucedida:", result);
     
        route.back();
    
    } catch (error) {
      console.error("Erro na verificação", error);
      setErr("Erro na verificação, faça o login novamente");
      setMessage("Erro na verificação, faça o login novamente");
     
        route.back();
     
    } finally {
      setMessage(null);
      setLoading(false);
    }
  };
  return {
    celular,
    loading,
    err,
    register,
    handleSubmit,
    setValue,
    errors,
    onSubmitVerify,
    message,
  };
}
