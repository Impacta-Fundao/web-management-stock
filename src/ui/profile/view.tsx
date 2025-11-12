import Loading from "@/components/ui/animation/loading";
import FormRegisterSeller, {
  SellerPropsModel,
} from "@/models/seller/types/seller-props-model";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

interface SellerProps {
  seller: SellerPropsModel | undefined;
  loading: boolean;
  register: UseFormRegister<FormRegisterSeller>;
  handleSubmit: UseFormHandleSubmit<FormRegisterSeller, FormRegisterSeller>;
  createOnSubmitEdit: SubmitHandler<FormRegisterSeller>;
  errors: FieldErrors<FormRegisterSeller>;
  message: string | null;
  setMessage: Dispatch<SetStateAction<string | null>>;
}

export default function ProfilePage({
  seller,
  loading,
  createOnSubmitEdit,
  errors,
  handleSubmit,
  register,
  message,
  setMessage,
}: SellerProps) {
  if (loading) return <Loading />;

  const [editing, setEditing] = useState(false);

  // Função que lida com o submit e depois desativa o modo de edição
  const handleSave = async (data: FormRegisterSeller) => {
    await createOnSubmitEdit(data);

    setEditing(false); // Desativa o modo de edição após salvar
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-6">
      <section className="w-full max-w-4xl mx-auto bg-white/70 backdrop-blur-md border border-slate-200 rounded-2xl shadow-lg p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white text-3xl font-extrabold shadow-inner">
            {(seller?.nome ?? "").slice(0, 2).toUpperCase()}
          </div>

          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">
              {seller?.nome}
            </h1>
            <p className="mt-2 text-sm text-slate-500">Dados do usuário</p>
            {message && <span className="text-red-400">{message}</span>}

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setEditing(!editing), setMessage(null);
                }}
                className={`px-4 py-2 rounded-md text-sm transition ${
                  editing
                    ? "bg-slate-100 text-slate-600"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {editing ? "Cancelar" : "Editar"}
              </button>

              {editing && (
                <button
                  type="submit"
                  form="profile-form" // Conecta com o formulário
                  className="px-4 py-2 rounded-md bg-green-600 text-white text-sm hover:bg-green-700 transition"
                >
                  Salvar
                </button>
              )}
            </div>
          </div>
        </div>

     
        <form
          id="profile-form" 
          onSubmit={handleSubmit(handleSave)}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >

          <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
            <h3 className="text-sm font-medium text-slate-700 mb-3">Contato</h3>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-slate-50 rounded-md p-3 mb-2">
              <span className="text-xs text-slate-500 mb-1 sm:mb-0">
                Celular
              </span>
              {editing ? (
                <input
                  type="text"
                  {...register("celular", {
                    maxLength: { message: "Passe o numero com DDD", value: 11 },
                    minLength: {
                      message: "Passe o numero com o DDD",
                      value: 11,
                    },
                  })}
                  maxLength={11}
                  className="w-full sm:w-1/2 border border-slate-200 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <span className="text-sm text-slate-700">
                  {seller?.celular}
                </span>
              )}
              {errors.celular && <span className="mx-2 text-xs text-red-400">{errors.celular.message}</span>}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-slate-50 rounded-md p-3">
              <span className="text-xs text-slate-500 mb-1 sm:mb-0">Email</span>
              {editing ? (
                <input
                  type="email"
                  {...register("email")}
                  className="w-full sm:w-1/2 border border-slate-200 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <span className="text-sm text-slate-700">{seller?.email}</span>
              )}
              {errors.email && <span className="mx-2 text-xs text-red-400">{errors.email.message}</span>}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
            <h3 className="text-sm font-medium text-slate-700 mb-3">
              Identificação
            </h3>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-slate-50 rounded-md p-3 mb-2">
              <span className="text-xs text-slate-500 mb-1 sm:mb-0">CNPJ</span>
              {editing ? (
                <input
                  type="text"
                  {...register("cnpj",{
                    maxLength:{message:"CNPJ precisa ter 14 caracteres", value:14},
                    minLength:{message:"CNPJ precisa ter 14 caracteres", value:14}
                  })}
                  maxLength={14}
                  className="w-full sm:w-1/2 border border-slate-200 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <span className="text-sm text-slate-700">{seller?.cnpj}</span>
              )}
              {errors.cnpj && <span className="mx-2 text-xs text-red-400">{errors.cnpj.message}</span>}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-slate-50 rounded-md p-3">
              <span className="text-xs text-slate-500 mb-1 sm:mb-0">Senha</span>
              {editing ? (
                <input
                  type="password"
                  {...register("senha")}
                  placeholder=""
                  className="w-full sm:w-1/2 border border-slate-200 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <span className="text-sm text-slate-700">••••••••</span>
              )}
              {errors.senha && <span className="mx-2 text-xs text-red-400">{errors.senha.message}</span>}
            </div>
          </div>

        </form>

        <div className="mt-8 bg-white rounded-xl border border-slate-100 p-4 shadow-sm sm:col-span-2">
          <h3 className="text-sm font-medium text-slate-700 mb-3">
            Atividades recentes
          </h3>
          <p className="text-sm text-slate-600">
            Nenhuma atividade recente 
          </p>
        </div>
      </section>
    </main>
  );
}
