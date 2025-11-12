import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { email, nome, cnpj, celular, senha } = req.body;

  if (!email || !nome || !cnpj || !celular || !senha) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios",
    });
  }

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/mercados`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        nome,
        cnpj,
        celular,
        senha,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        responseData.message || `Erro ${response.status} no backend`
      );
    }

    return res.status(200).json({
      message: "Conta Criada com Sucesso",
      data: responseData,
    });
  } catch (error) {
    console.error("💥 Erro completo:", error);

    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
}
