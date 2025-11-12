import EditProduct from "@/ui/produtos/[id]/editProducts";

export default async function EditProductPage(props: {params:Promise<{id:string}>}){
    return <EditProduct params={props.params}/>
}