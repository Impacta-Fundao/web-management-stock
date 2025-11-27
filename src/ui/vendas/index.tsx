"use client"
import VendasView from "./view";
import useVendasModel from "./viewModel";

export default function VendasPage() {
  const { getVendas, loading, venda,inactivate } = useVendasModel();
  return <VendasView inactivate={inactivate} getVendas={getVendas} loading={loading} venda={venda} />;
}
