import { getTokenFromCookies, makeAuthenticatedRequest } from "@/lib/auth-helper";
import { ProdutosFormRegister } from "@/models/produtos/types/produtos-props-mpdel";
import { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/navigation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { imagem, nome, preco, quantidade }: ProdutosFormRegister = req.body;
  const token = getTokenFromCookies(req)
  if (!token) redirect('/');
  if (!imagem || !nome || !preco || !quantidade) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios" });
  }

  try {
    const response = await makeAuthenticatedRequest(req, `/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imagem,
        nome,
        preco,
        quantidade,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Error ${response.status} - ${data.message}`);
    }
    return res
      .status(200)
      .json({ message: "Produto cadastrado com sucesso", data });
  } catch (error) {
    console.error("Erro ao buscar Produtos: ", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}
