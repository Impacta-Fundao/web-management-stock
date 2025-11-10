import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { celular, codigo } = req.body;

    if (!celular || !codigo) {
      return res.status(400).json({
        message: "Celular e código são obrigatórios",
      });
    }

    const backendResponse = await fetch(
      `${process.env.API_BASE_URL}/mercados/verificar_codigo`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ celular, codigo }),
      }
    );
    const data = await backendResponse.json();

    if (backendResponse.ok) {
      return res.status(200).json({ data: data, celular: celular });
    } else {
      return res.status(400).json({ message: data.message });
    }
  } catch (error) {
    console.error("Erro na verificação: ", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}
