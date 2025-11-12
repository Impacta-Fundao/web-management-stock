'use client'
import ProdutosRegisterView from "./view";
import useProdutosRegister from "./viewModel";

export default function ProdutosFormPage() {
  const {
    handleSubmit,
    loading,
    message,
    onSubmiteRegisterProduct,
    postProduct,
    register,
    errors
  } = useProdutosRegister();
  return (
    <ProdutosRegisterView
    errors={errors}
      handleSubmit={handleSubmit}
      loading={loading}
      message={message}
      onSubmiteRegisterProduct={onSubmiteRegisterProduct}
      register={register}
    />
  );
}
