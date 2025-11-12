import PreviewProductsPage from "@/ui/produtos/[id]";

export default async function ProdutosPreviewPage(props: {
  params: Promise<{ id: string }>;
}) {
  return <PreviewProductsPage params={props.params} />;
}
