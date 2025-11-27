import { VendasData } from "@/models/vendas/types/vendas-props-model";
import { getColumns } from "./components/columns/columns";
import { DataTable } from "./components/dataTable/dataTable";
import Loading from "@/components/ui/animation/loading";
import EmptyState from "@/components/pages/empty";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface VendasPropsModel {
  loading: boolean;
  venda: VendasData[];
  getVendas: () => Promise<VendasData[]>;
  inactivate: (id: string) => Promise<string>;
}

export default function VendasView({
  getVendas,
  loading,
  venda,
  inactivate,
}: VendasPropsModel) {
  const router = useRouter();
  if (loading) return <Loading />;

  const handleInactivate = async (id: string) => {
    try {
      await inactivate(id);
      await getVendas();
    } catch (error) {
      console.error("Erro ao inativar:", error);
    }
  };

  return (
    <main className="flex flex-col mx-auto py-10 h-screen">
      {venda ? (
        <DataTable
          columns={getColumns({ onInactivate: handleInactivate })}
          data={venda}
        />
      ) : (
        <div>
          <EmptyState />
          <div className="flex justify-center">
            <Button onClick={() => router.push("Vendas/register")} className="">
              Cadastrar Venda
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
