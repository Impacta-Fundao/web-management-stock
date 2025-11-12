import { ProdutosData } from "@/models/produtos/types/produtos-props-mpdel";
import { DataTable } from "./components/DataTable/dataTable";
import { columns } from "./components/columns/columns";
import Loading from "@/components/ui/animation/loading";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/pages/empty";

interface ProductsViewProps {
  loading: boolean;
  produto: ProdutosData[];
  getProducts: () => Promise<ProdutosData[]>;
  error: string | null;
}

export default function ProductsView({
  error,
  getProducts,
  loading,
  produto,
}: ProductsViewProps) {
  if (loading) {
    return <Loading />;
  }
  if (!produto || produto === undefined) return <EmptyState/>
  return (
    <main className="flex flex-col mx-auto py-10 h-screen">
      <DataTable columns={columns} data={produto} />
    
    </main>
  );
}
