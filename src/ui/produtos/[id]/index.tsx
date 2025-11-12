import PreviewView from "./view";

interface PreviewProducts {
  params: Promise<{ id: string }>;
}

export default async function PreviewProductsPage(props: PreviewProducts) {
  const id = await props.params;
  return <PreviewView params={id} />;
}
