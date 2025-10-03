import {
  deleteSeller,
  getSellers,
  patchSeller,
  postSeller,
  putSeller,
} from "@/models/seller/seller-model";
import { SellerPropsModel } from "@/models/seller/types/seller-props-model";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function useSellerModel() {
  const [seller, setSeller] = useState<Array<SellerPropsModel>>([]); // estado que recebe os sellers existentes e cadastrados
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [updateMode, setUpdateMode] = useState<"put" | "patch">("put");

  const selectedSeller = editingId
    ? seller.find((seller) => seller.id === editingId)
    : null;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SellerPropsModel>();

  const loadSeller = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getSellers();
      setSeller(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSeller();
  }, [loadSeller]);

  const handleCreate = useCallback(
    async (data: Omit<SellerPropsModel, "id">) => {
      try {
        setLoading(true);
        setError("");
        const newSeller = await postSeller(data);
        setSeller((prev) => [...prev, newSeller]);
        reset();
        return newSeller;
      } catch (error) {
        setError((error as Error).message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [reset]
  );

  const handleUpdatePut = useCallback(async (id: number, data: SellerPropsModel) => {
    try {
      setLoading(true);
      setError("");
      const updatedSeller = await putSeller(id, data);
      setSeller((prev) =>
        prev.map((seller) => (seller.id === id ? updatedSeller : seller)) 
      );
      setEditingId(null);
      reset();
      return updatedSeller;
    } catch (error) {
      setError((error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [reset]);

  const handlePatchSeler = useCallback(
    async (id: number, data: Partial<SellerPropsModel>) => {
      try {
        setLoading(true);
        setError("");
        const updateSeller = await patchSeller(id, data);
        console.log("RESPOSTA DO PATCH: ", updateSeller)
        setSeller((prev) =>
          prev.map((seller) =>
            seller.id === id ? { ...seller, ...updateSeller } : seller
          )
        );
        return updateSeller;
      } catch (error) {
        setError((error as Error).message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleDelete = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError("");
      await deleteSeller(id);
      setSeller((prev) => prev.filter((seller) => seller.id !== id));
    } catch (error) {
      setError((error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getChangesFields = useCallback((
    currentData: SellerPropsModel,
    originalData: SellerPropsModel
  ): Partial<SellerPropsModel> => {
    const changes: Partial<SellerPropsModel> = {};
    
    (Object.keys(currentData) as Array<keyof SellerPropsModel>).forEach((key) => {
      if (key === "senha") {
        if (currentData.senha && currentData.senha.trim() !== "") {
          changes.senha = currentData.senha;
        }
      } else if (currentData[key] !== originalData[key]) {
        (changes as any)[key] = currentData[key];
      }
    });
    
    return changes;
  }, []);

 const onSubmit = useCallback(async (formData: SellerPropsModel) => {
    try {
      if (editingId && selectedSeller) {
        if (updateMode === "put") {
          await handleUpdatePut(editingId, formData);
        } else {
          const changes = getChangesFields(formData, selectedSeller);
          if (Object.keys(changes).length === 0) {
            alert("Nenhuma alteração detectada");
            return;
          }
          await handlePatchSeler(editingId, changes);
        }
      } else {
        await handleCreate(formData);
      }
    } catch (error) {
      console.error("Erro no submit: ", error);
      setError((error as Error).message);
    }
  }, [editingId, selectedSeller, updateMode, handleUpdatePut, handlePatchSeler, handleCreate, getChangesFields]);

  const toggleUpdateMode = useCallback(() => {
    setUpdateMode((prev) => (prev === "put" ? "patch" : "put"));
  }, []);

  const handleEdit = useCallback((id: number) => {
    const sellerToEdit = seller.find((s) => s.id === id); 
    
    if (!sellerToEdit) {
      setError("Seller não encontrado para edição");
      return;
    }

    setEditingId(id);
    setValue("nome", sellerToEdit.nome || "");
    setValue("celular", sellerToEdit.celular || "");
    setValue("email", sellerToEdit.email || "");
    setValue("cnpj", sellerToEdit.cnpj || "");
    setValue("status", sellerToEdit.status || false);
    setValue("senha", "");
  }, [seller, setValue]);

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    reset();
  }, [reset]);


  useEffect(() => {
    console.log('Seller state: ', seller)
  }, [seller])

  return {
    seller,
    loading,
    error,
    editingId,
    updateMode,

    register,
    handleSubmit,
    setValue,
    reset,
    errors,

    loadSeller,
    handleCreate,
    handleUpdatePut,
    handlePatchSeler,
    handleDelete,
    handleCancelEdit,
    handleEdit,
    toggleUpdateMode,
    onSubmit
  };
}
