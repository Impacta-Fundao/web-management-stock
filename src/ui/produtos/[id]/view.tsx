"use client";
import Loading from "@/components/ui/animation/loading";
import usePreviewUser from "./viewModel";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useEditProduct from "./editProducts/viewModel";
import { Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface UserPreviewView {
  params: { id: string };
}

export default function Previewdatas({ params }: UserPreviewView) {
  const { data, message, loading,activateProduct,inactivateProduct,deleteProduct } = usePreviewUser(params);
  const route = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (loading) return <Loading />;
  if (message)
    return (
      <>
        <div className="flex justify-center mt-[10%] text-5xl">
          Status - {message}
        </div>
      </>
    );

  // Se você tiver múltiplas imagens no futuro, pode usar um array
  // Por enquanto, vamos criar um array com a imagem atual para simular o carrossel
  const images = data?.imagem ? [data.imagem] : [];

  const nextImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? images.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Detalhes do Produto
          </h1>
          <p className="text-gray-600 mt-2">
            Visualize todas as informações do produto
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                {/* Carrossel de Imagens */}
                <div className="aspect-square rounded-lg bg-gray-100 overflow-hidden relative">
                  {images.length > 0 ? (
                    <>
                      <img
                        src={images[currentImageIndex]}
                        alt={data?.nome || "Imagem do produto"}
                        className="w-full h-full object-cover"
                      />

                      {/* Navegação do Carrossel - Só mostra se tiver mais de uma imagem */}
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                              />
                            </svg>
                          </button>

                          <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button>
                        </>
                      )}

                      {/* Indicadores - Só mostra se tiver mais de uma imagem */}
                      {images.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                          {images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => goToImage(index)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                index === currentImageIndex
                                  ? "bg-white"
                                  : "bg-white bg-opacity-50"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg
                        className="w-16 h-16"
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

                {/* Miniaturas das Imagens - Só mostra se tiver mais de uma imagem */}
                {images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto py-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded border-2 transition-all ${
                          index === currentImageIndex
                            ? "border-blue-500"
                            : "border-gray-300"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Miniatura ${index + 1}`}
                          className="w-full h-full object-cover rounded"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Status do Produto */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Status do Produto
                    </span>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        data?.status
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {data?.status ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Informações do Produto
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome do Produto
                    </label>
                    <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                      <p className="text-gray-900 font-medium">{data?.nome}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID do Produto
                    </label>
                    <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                      <p className="text-gray-600 font-mono">#{data?.id}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                      <span className="text-sm font-medium text-blue-900">
                        Preço
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">
                      R$ {data?.preco?.toFixed(2)}
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <div className="flex items-center space-x-2 mb-2">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                      <span className="text-sm font-medium text-green-900">
                        Estoque
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-green-900">
                      {data?.quantidade} unidades
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <button
                    onClick={() =>
                      route.push(`/Produtos/${params.id}/EditProduto`)
                    }
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Editar Produto
                  </button>

                  {/* Botão para abrir visualização em modal/tela cheia */}
                  <button
                    onClick={() => {
                      // Aqui você pode abrir um modal com a imagem em tamanho maior
                      // ou implementar uma visualização em tela cheia
                      const imageUrl = data?.imagem;
                      if (imageUrl) {
                        // Exemplo: abrir em nova aba (substitua pela sua lógica de modal)
                        window.open(imageUrl, "_blank");
                      }
                    }}
                    disabled={!data?.imagem}
                    className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3-3H7"
                      />
                    </svg>
                    Visualizar em Tela Cheia
                  </button>

                  {!data?.status ? (
                    <button onClick={activateProduct} className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
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
                      Ativar Produto
                    </button>
                  ) : (
                    <button onClick={inactivateProduct} className="inline-flex items-center px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
                     <X className="w-4"/>
                      Inativar Produtos
                    </button>
                  )}
                  
                  <AlertDialog >
                    <AlertDialogTrigger className="w-[210px] bg-red-600 rounded-md flex items-center gap-3 px-10 text-white"><Trash className="text-white w-4"/>Deletar</AlertDialogTrigger>
                    <AlertDialogContent >
                      <AlertDialogHeader >
                        <AlertDialogTitle >Você tem certeza de constinuar com essa ação?</AlertDialogTitle>
                        <AlertDialogDescription >Essa ação fará com que esse produto seja excluido do nosso banco de dados</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter >
                        <AlertDialogCancel >Cancelar</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600" onClick={deleteProduct}>Continuar</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
