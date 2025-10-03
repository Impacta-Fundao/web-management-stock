"use client";

import { useState } from "react";

import { SellerPropsModel } from "@/models/seller/types/seller-props-model";
import { postSeller } from "@/models/seller/seller-model";

export default function SellerForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<Omit<SellerPropsModel, "id">>({
    nome: "",
    email: "",
    cnpj: "",
    celular: "",
    senha: "",
    status: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const newSeller = await postSeller(formData);
      setMessage(`✅ Seller criado com sucesso! ID: ${newSeller.id}`);

      setFormData({
        nome: "",
        email: "",
        cnpj: "",
        celular: "",
        senha: "",
        status: true,
      });
    } catch (error) {
      setMessage(`❌ Erro: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Cadastro de Seller
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nome Completo *
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Digite o nome completo"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="exemplo@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="cnpj"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            CNPJ *
          </label>
          <input
            type="text"
            id="cnpj"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="00.000.000/0000-00"
            maxLength={18}
          />
        </div>

        <div>
          <label
            htmlFor="celular"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Celular *
          </label>
          <input
            type="tel"
            id="celular"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="(11) 99999-9999"
          />
        </div>


        <div>
          <label
            htmlFor="senha"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Senha *
          </label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Digite uma senha segura"
            minLength={6}
          />
        </div>


        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status ? "true" : "false"}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                status: e.target.value === "true",
              }))
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="true">Ativo</option>
            <option value="false">Inativo</option>
          </select>
        </div>


        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "⏳ Cadastrando..." : "📝 Cadastrar Seller"}
        </button>


        {message && (
          <div
            className={`p-4 rounded-md ${
              message.includes("✅")
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
