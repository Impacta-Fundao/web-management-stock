import Loading from "@/components/ui/animation/loading";
import { ProdutosData } from "@/models/produtos/types/produtos-props-mpdel";
import { VendasRegister } from "@/models/vendas/types/vendas-props-model";
import { useState } from "react";
import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

interface VendasRegisterViewProps {
  produto: ProdutosData[];
  register: UseFormRegister<VendasRegister>;
  handleSubmit: UseFormHandleSubmit<VendasRegister, VendasRegister>;
  onSubmiteRegisterVendas: SubmitHandler<VendasRegister>;
  loading: boolean
}

export default function VendasRegisterView({
  produto,
  handleSubmit,
  onSubmiteRegisterVendas,
  register,
  loading

}: VendasRegisterViewProps) {
  const [quantidades, setQuantidades] = useState<Record<string, number>>({});

  // Wrapper para incluir a quantidade no submit
  const handleFormSubmit = (data: VendasRegister) => {
    const quantidade = quantidades[data.produtoId];
    onSubmiteRegisterVendas({ ...data, quantidade });
  };

  if (loading) return <Loading/>

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="max-w-4xl mx-auto">
          {/* Cabeçalho */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              Lista de Produtos
            </h1>
            <p className="text-slate-600 mt-2">
              Selecione os produtos e defina as quantidades para registrar a
              venda
            </p>
          </div>

          {/* Lista de Produtos */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {produto.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-slate-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-slate-500">
                  Adicione produto para começar a vender
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-200">
                {produto.map((produto) => (
                  <div
                    key={produto.id}
                    className="flex items-center gap-4 p-6 hover:bg-slate-50 transition-colors"
                  >
                    {/* Radio */}
                    <div className="flex items-center">
                      <input
                        type="radio"
                        value={produto.id}
                        {...register("produtoId")}
                        className="h-5 w-5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                      />
                    </div>

                    {/* Imagem */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-slate-200 rounded-lg overflow-hidden">
                        {produto.imagem ? (
                          <img
                            src={produto.imagem}
                            alt={produto.nome}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-slate-600">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Informações do Produto */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-slate-900 truncate">
                            {produto.nome}
                          </h3>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-2xl font-bold text-green-600">
                              R$ {produto.preco.toFixed(2)}
                            </span>
                            <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded">
                              {produto.quantidade} em estoque
                            </span>
                          </div>

                          {/* Campo de Quantidade para Venda */}
                          <div className="flex items-center gap-3 mt-3">
                            <label
                              htmlFor={`quantidade-${produto.id}`}
                              className="text-sm font-medium text-slate-700"
                            >
                              Quantidade para venda:
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                id={`quantidade-${produto.id}`}
                                type="number"
                                min="1"
                                max={produto.quantidade}
                                value={quantidades[produto.id] || ""}
                                onChange={(e) =>
                                  setQuantidades((prev) => ({
                                    ...prev,
                                    [produto.id]: Number(e.target.value),
                                  }))
                                }
                                
                                className="w-20 px-2 py-1 border border-slate-300 rounded-md text-center text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              produto.status ? "bg-green-500" : "bg-red-500"
                            }`}
                          />
                          <span
                            className={`text-sm font-medium ${
                              produto.status ? "text-green-700" : "text-red-700"
                            }`}
                          >
                            {produto.status ? "Ativo" : "Inativo"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer com ações */}
          {produto.length > 0 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-slate-600">
                {produto.length} produto{produto.length !== 1 ? "s" : ""}{" "}
                encontrado{produto.length !== 1 ? "s" : ""}
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Registrar Venda
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}