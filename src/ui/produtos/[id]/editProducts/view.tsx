"use client";
interface EditProductProps {
  register: UseFormRegister<ProdutosFormRegister>;
  handleSubmit: UseFormHandleSubmit<ProdutosFormRegister, ProdutosFormRegister>;
  createOnSubmitEdit: (id: string) => SubmitHandler<ProdutosFormRegister>;
  loading: boolean;
  message: string | null;
  editProduct: (produtoData: ProdutosFormRegister, id: string) => Promise<void>;
  errors: FieldErrors<ProdutosFormRegister>;
  id: string;
  status: boolean;
}
import { Input } from "@/components/ui/input";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

export interface ProdutosFormRegister {
  id?: string;
  nome: string;
  preco: number;
  quantidade: number;
  imagem: string;
  status?: boolean;
}

export default function ProdutoEditForm({
  createOnSubmitEdit,
  editProduct,
  handleSubmit,
  loading,
  message,
  register,
  errors,
  id,
  status,
}: EditProductProps) {
  const onSubmitEdit = createOnSubmitEdit(id);
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit(onSubmitEdit)} className="p-6 space-y-8">
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Informações Básicas
                </h2>
                <p className="text-gray-600 mt-1">
                  Dados principais do produto
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label
                    htmlFor="nome"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nome do Produto *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    {...register("nome", {
                      minLength: {
                        value: 2,
                        message: "Nome deve ter pelo menos 2 caracteres",
                      },
                    })}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.nome ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Digite o nome do produto"
                  />
                  {errors.nome && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.nome.message}
                    </p>
                  )}
                </div>

                {/* Campo Preço */}
                <div>
                  <label
                    htmlFor="preco"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Preço (R$) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      R$
                    </span>
                    <input
                      type="number"
                      id="preco"
                      step="0.01"
                      min="0"
                      {...register("preco", {
                        min: {
                          value: 0.01,
                          message: "Preço deve ser maior que zero",
                        },
                      })}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.preco ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="0,00"
                    />
                  </div>
                  {errors.preco && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.preco.message}
                    </p>
                  )}
                </div>

                {/* Campo Quantidade */}
                <div>
                  <label
                    htmlFor="quantidade"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Quantidade em Estoque *
                  </label>
                  <input
                    type="number"
                    id="quantidade"
                    min="0"
                    {...register("quantidade", {
                      min: {
                        value: 0,
                        message: "Quantidade não pode ser negativa",
                      },
                    })}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.quantidade ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="0"
                  />
                  {errors.quantidade && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.quantidade.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Seção: Imagem do Produto */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload da Imagem */}
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="imagem"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Alterar Imagem
                    </label>

                    <Input
                      type="text"
                      {...register("imagem")}
                      className=""
                      placeholder="https://....."
                    />
                  </div>

                  {/* Status do Produto (apenas edição) */}
                </div>
              </div>
            </div>

            {/* Seção: Ações */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancelar
              </button>
              {status && (
                <button
                  type="button"
                  className="px-6 py-3 border border-green-300 bg-green-600 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Editado com sucesso
                </button>
              )}
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Atualizar Produto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
