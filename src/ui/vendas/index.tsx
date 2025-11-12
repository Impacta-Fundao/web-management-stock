"use client"
import VendasView from "./view";
import useVendasModel from "./viewModel";

export default function VendasPage() {
  const { getVendas, loading, venda } = useVendasModel();
  return <VendasView getVendas={getVendas} loading={loading} venda={venda} />;
}
