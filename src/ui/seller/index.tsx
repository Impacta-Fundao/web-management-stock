'use client'
import SellerView from "./view";
import useSellerModel from "./viewModel";

export default function SellerPage(){
  const {seller} = useSellerModel()
  return <SellerView seller={seller} />
}