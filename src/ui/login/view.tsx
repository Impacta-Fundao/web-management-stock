"use client";
import React, { useState } from "react";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import { LoginProps } from "@/models/auth/types/auth-login-props-model";
import FormRegisterSeller from "@/models/seller/types/seller-props-model";
import CardTxt from "@/components/ui/cardMessage";
import Loading from "@/components/ui/animation/loading";

export interface LoginViewProps {
  onSubmitSignIn: SubmitHandler<LoginProps>;
  onSubmitRegister: SubmitHandler<FormRegisterSeller>;
  registerLogin: UseFormRegister<LoginProps>;
  register: UseFormRegister<FormRegisterSeller>;
  handleSubmitLogin: UseFormHandleSubmit<LoginProps, LoginProps>;
  handleSubmit: UseFormHandleSubmit<FormRegisterSeller, FormRegisterSeller>;
  errors: FieldErrors<FormRegisterSeller>;
  errorsLogin: FieldErrors<LoginProps>;
  loading: boolean;
  message: string | null;
}

const LoginView = ({
  handleSubmitLogin,
  onSubmitRegister,
  onSubmitSignIn,
  registerLogin,
  loading,
  register,
  handleSubmit,
  errors,
  errorsLogin,
  message,
}: LoginViewProps) => {
  const [isLogin, setIsLogin] = useState(true);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {/* {<CardTxt message={message} />} */}
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center p-4 text-black">
        <main className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-800">GetStock</h1>
            </div>
            <p className="text-gray-600 text-sm">
              Gestão de Estoque para Mini Mercados
            </p>
          </div>

          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                isLogin
                  ? "bg-white shadow-md text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Entrar
            </button>
            <button
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                !isLogin
                  ? "bg-white shadow-md text-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Cadastrar
            </button>
          </div>

          {/* FORMULÁRIO DE LOGIN */}
          {isLogin && (
            <form
              onSubmit={handleSubmitLogin(onSubmitSignIn)}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  {...registerLogin("email", {
                    required: "Email é obrigatório",
                  })}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                />
                {errorsLogin.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorsLogin.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="senha"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Senha
                </label>
                <input
                  type="password"
                  id="senha"
                  {...registerLogin("senha", {
                    required: "Senha é obrigatória",
                  })}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                />
                {errorsLogin.senha && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorsLogin.senha.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:ring-4 focus:ring-blue-200 outline-none"
              >
                Entrar
              </button>
            </form>
          )}

          {!isLogin && (
            <form
              onSubmit={handleSubmit(onSubmitRegister)}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="nome"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Nome do Estabelecimento
                </label>
                <input
                  type="text"
                  id="nome"
                  placeholder="Ex: Mercado Central"
                  {...register("nome", {
                    required: "Nome é obrigatório",
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                />
                {errors.nome && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.nome?.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="cnpj"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  CNPJ
                </label>
                <input
                  type="text"
                  id="cnpj"
                  placeholder="00.000.000/0000-00"
                  {...register("cnpj", {
                    required: "CNPJ é obrigatório",
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                />
                {errors.cnpj && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cnpj.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="celular"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Celular
                </label>
                <input
                  type="tel"
                  id="celular"
                  placeholder="(11) 99999-9999"
                  {...register("celular", {
                    required: "Celular é obrigatório",
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                />
                {errors.celular && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.celular?.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="emailCadastro"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  E-mail
                </label>
                <input
                  type="email"
                  id="emailCadastro"
                  placeholder="seu@email.com"
                  {...register("email", {
                    required: "Email é obrigatório",
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="senhaCadastro"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Senha
                </label>
                <input
                  type="password"
                  id="senhaCadastro"
                  placeholder="••••••••"
                  {...register("senha", {
                    required: "Senha é obrigatória",
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                />
                {errors.senha && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.senha.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:ring-4 focus:ring-blue-200 outline-none"
              >
                Cadastrar
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
              <button
                type="button"
                className="text-blue-600 font-semibold hover:text-blue-700 underline transition-colors"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Cadastre-se" : "Fazer login"}
              </button>
            </p>
          </div>
        </main>
      </div>
    </>
  );
};

export default LoginView;
