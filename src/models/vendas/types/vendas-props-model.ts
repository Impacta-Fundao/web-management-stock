export interface VendasData {
  data_venda: string;
  id: number;

  preco_venda: number;
  produto_id: number;
  quantidade: number;
  total_venda: number;
  status: boolean
}

export interface VendasRegister {
  produtoId:string
  quantidade:number
}