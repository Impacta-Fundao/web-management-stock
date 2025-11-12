export interface ProdutosData {
  id: number;
  imagem: string;
  nome: string;
  preco: number;
  quantidade: number;
  status: boolean;
}

export interface ProdutosFormRegister {
  nome: string;
  preco: number;
  quantidade: number;
  imagem: string;
}
