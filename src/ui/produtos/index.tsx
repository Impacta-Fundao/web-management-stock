import ProdutosView from "./view";
import ProdutosViewModel from "./viewModel";

export default function ProdutosPage() {
    const {produtos,nomes} = ProdutosViewModel()
    
    return <ProdutosView produtos={produtos} nomes={nomes}/>
}