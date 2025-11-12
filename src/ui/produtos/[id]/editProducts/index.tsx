"use client";
import { useParams } from "next/navigation";
import ProdutoEditForm from "./view";
import useEditProduct from "./viewModel";

export default function EditProdutoPage() {
  const {
    createOnSubmitEdit,
    editProduct,
    errors,
    handleSubmit,
    loading,
    message,
    register,
    status
  } = useEditProduct();

  const params = useParams();
  const productid = (params?.id ?? "") as string;

  return (
    <ProdutoEditForm
    status={status}
      id={productid}
      errors={errors}
      createOnSubmitEdit={createOnSubmitEdit}
      editProduct={editProduct}
      handleSubmit={handleSubmit}
      loading={loading}
      message={message}
      register={register}
    />
  );
}
