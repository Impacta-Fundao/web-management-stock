'use client'
import ProductsView from "./view";
import useProdutosModel from "./viewModel";

export default function ProdutosPage() {
    const {error,getProducts,loading,produto} = useProdutosModel()
    return <ProductsView error={error} getProducts={getProducts} loading={loading} produto={produto}/>
}