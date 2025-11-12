import {
  getTokenFromCookies,
  makeAuthenticatedRequest,
} from "@/lib/auth-helper";
import {
  ProdutosFormRegister,
} from "@/models/produtos/types/produtos-props-mpdel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verificar método HTTP
  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const token = getTokenFromCookies(req);
  
  // Verificar se o token existe
  if (!token) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  const { imagem, nome, preco, quantidade }: ProdutosFormRegister = req.body;
  const { id } = req.query;

  // Validar ID
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: 'ID do produto é obrigatório' });
  }

  // Validar que pelo menos um campo foi enviado para atualização
  if (!imagem && !nome && !preco && !quantidade) {
    return res.status(400).json({ message: 'Altere pelo menos um campo' });
  }

  try {
    // Criar objeto de atualização apenas com os campos que foram enviados
    const updateData: Partial<ProdutosFormRegister> = {};
    
   if (imagem !== undefined) updateData.imagem = imagem;
    if (nome !== undefined) updateData.nome = nome;
    if (preco !== undefined) updateData.preco = preco;
    if (quantidade !== undefined) updateData.quantidade = quantidade;

    // Fazer a requisição para a API externa
    const response = await makeAuthenticatedRequest(req, `/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({nome, preco, quantidade, imagem:String(imagem)}),
    });

    // Verificar o content-type da resposta antes de tentar parsear JSON
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ 
        message: data.message || `Erro ${response.status}` 
      });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    
    // Tratamento mais específico de erros
    if (error instanceof Error) {
      return res.status(500).json({ 
        message: 'Erro interno do servidor',
        error: error.message 
      });
    }
    
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}