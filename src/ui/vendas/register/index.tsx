"use client";
import VendasRegisterView from "./view";
import useRegisterVendasModel from "./viewModel";

export default function VendasRegisterPage() {
  const {
    error,
    loading,
    produto,
    handleSubmit,
    onSubmiteRegisterVendas,
    register,

  } = useRegisterVendasModel();

  return (
    <VendasRegisterView
    loading={loading}
      produto={produto}
      handleSubmit={handleSubmit}
      onSubmiteRegisterVendas={onSubmiteRegisterVendas}
      register={register}
    />
  );
}
