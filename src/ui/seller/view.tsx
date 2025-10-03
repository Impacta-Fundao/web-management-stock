import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { SellerPropsModel } from "../../models/seller/types/seller-props-model";
import { BaseSyntheticEvent, useState } from "react";
import { Building2, Edit, Mail, Phone, Trash } from "lucide-react";

export interface SellerViewProps {
  seller: SellerPropsModel[];
  loading: boolean;
  error: string | undefined;
  editingId: number | null;
  updateMode: "put" | "patch";
  errors: FieldErrors<SellerPropsModel>;
  register: UseFormRegister<SellerPropsModel>;
  handleSubmit: UseFormHandleSubmit<SellerPropsModel>;
  onSubmit: (data: SellerPropsModel) => Promise<void>;
  setValue: UseFormSetValue<SellerPropsModel>;
  reset: UseFormReset<SellerPropsModel>;
  loadSeller: () => Promise<void>;
  handleCreate: (
    data: Omit<SellerPropsModel, "id">
  ) => Promise<SellerPropsModel>;
  handleUpdatePut: (
    id: number,
    data: SellerPropsModel
  ) => Promise<SellerPropsModel>;
  handlePatchSeler: (
    id: number,
    data: Partial<SellerPropsModel>
  ) => Promise<SellerPropsModel>;
  handleDelete: (id: number) => Promise<void>;
  handleCancelEdit: () => void;
  handleEdit: (id: number) => void;
  toggleUpdateMode: () => void;
}

export default function SellerView({
  editingId,
  error,
  errors,
  handleCancelEdit,
  handleCreate,
  handleDelete,
  handleEdit,
  handleSubmit,
  loading,
  register,
  reset,
  seller,
  toggleUpdateMode,
  onSubmit,
  updateMode,
}: SellerViewProps) {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      handleCancelEdit();
      reset();
    }
  };

  const onSubmitEdit = async (data: SellerPropsModel) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error("Erro ao editar seller: ", error);
    }
  };

  const onSubmitCreate = async (data: SellerPropsModel) => {
    try {
      await handleCreate(data);
      setShowForm(false);
      reset();
    } catch (error) {
      console.error("Erro ao criar seller:", error);
    }
  };

  const formSubmitHandlerCreate = handleSubmit(onSubmitCreate);
  const formSubmitHandlerEdit = handleSubmit(onSubmitEdit);

  if (loading) return <div className="p-4">🔄 Carregando sellers...</div>;
  if (error) return <div className="p-4 text-red-600">❌ Erro: {error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Sellers</h1>
        <button
          onClick={toggleForm}
          className={`px-4 py-2 rounded ${
            showForm ? "bg-gray-500 text-white" : "bg-green-500 text-white"
          }`}
        >
          {showForm ? "✖ Cancelar" : " Novo Seller"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Criar Novo Seller</h2>

          <form onSubmit={formSubmitHandlerCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome *</label>
                <input
                  {...register("nome", { required: "Nome é obrigatório" })}
                  className="w-full p-2 border rounded"
                  placeholder="Nome completo"
                />
                {errors.nome && (
                  <span className="text-red-500 text-sm">
                    {errors.nome.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email é obrigatório",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Email inválido",
                    },
                  })}
                  className="w-full p-2 border rounded"
                  placeholder="exemplo@email.com"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">CNPJ *</label>
                <input
                  maxLength={14}
                  max={14}
                  {...register("cnpj", {
                    required: "CNPJ é obrigatório",
                    maxLength: 14,
                  })}
                  className="w-full p-2 border rounded"
                  placeholder="00.000.000/0000-00"
                />
                {errors.cnpj && (
                  <span className="text-red-500 text-sm">
                    {errors.cnpj.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Celular *
                </label>
                <input
                  {...register("celular", {
                    required: "Celular é obrigatório",
                  })}
                  className="w-full p-2 border rounded"
                  placeholder="(11) 99999-9999"
                />
                {errors.celular && (
                  <span className="text-red-500 text-sm">
                    {errors.celular.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Senha *
                </label>
                <input
                  type="password"
                  {...register("senha", { required: "Senha é obrigatória" })}
                  className="w-full p-2 border rounded"
                  placeholder="Digite a senha"
                />
                {errors.senha && (
                  <span className="text-red-500 text-sm">
                    {errors.senha.message}
                  </span>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register("status")}
                  className="mr-2"
                  defaultChecked
                />
                <label className="text-sm font-medium">Status Ativo</label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? "Criando..." : "Criar Seller"}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">
          Sellers Cadastrados ({seller.length})
        </h2>

        {seller.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Nenhum seller cadastrado.
          </p>
        ) : (
          <div className="space-y-3">
            {seller.map((s) => (
              <div key={s.id} className="border p-4 rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{s.nome}</h3>
                    <p className="text-gray-600 flex p-2">
                      <Mail />
                      {s.email}
                    </p>
                    <p className="text-gray-600 flex p-2">
                      <Building2 /> {s.cnpj}
                    </p>
                    <p className="text-gray-600 flex p-2">
                      <Phone /> {s.celular}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs ${
                        s.status
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {s.status ? "Ativo" : "Inativo"}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => s.id && handleEdit(s.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                    >
                    <Edit/> Editar
                    </button>

                    <button
                      onClick={() => {
                        if (
                          s.id &&
                          confirm("Tem certeza que deseja deletar este seller?")
                        ) {
                          handleDelete(s.id);
                        }
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                    >
                      <Trash className="w-[50px]" /> Deletar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">Editando Seller</h2>

            <div className="flex items-center mb-4">
              <span className="mr-2">Modo:</span>
              <span
                className={`px-2 py-1 rounded ${
                  updateMode === "put"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {updateMode === "put" ? "PUT (Completo)" : "PATCH (Parcial)"}
              </span>
              <button
                onClick={toggleUpdateMode}
                className="ml-2 bg-gray-500 text-white px-2 py-1 rounded text-sm"
              >
                Alternar
              </button>
            </div>

            <form onSubmit={formSubmitHandlerEdit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Nome</label>
                  <input
                    {...register("nome")}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    {...register("email")}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label>CNPJ</label>
                  <input
                    maxLength={14}
                    {...register("cnpj", { maxLength: 14 })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label>Celular</label>
                  <input
                    {...register("celular")}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label>Nova Senha (opcional)</label>
                  <input
                    type="password"
                    {...register("senha")}
                    className="w-full p-2 border rounded"
                    placeholder="Deixe em branco para manter a atual"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...register("status")}
                    className="mr-2"
                  />
                  <label>Status Ativo</label>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  {loading ? "Atualizando..." : "Atualizar"}
                </button>

                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
