import { NextApiRequest, NextApiResponse } from "next";

interface BackendLoginResponse {
  access_token: string;
  message: string;
  seller_id: string;
  nome: string;
}

interface CustomLoginResponse {
  // token: string;
  seller_id: string;
  nome: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res
        .status(400)
        .json({ message: "Email e senha são obrigatórios" });
    }

    const backendResponse = await fetch(
      `https://ms-getstock.onrender.com/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      }
    );

    const backendData: BackendLoginResponse = await backendResponse.json();

    if (backendResponse.ok) {

      res.setHeader('Set-Cookie', `auth_token=${backendData.access_token}; Path=/; HttpOnly; SameSite=Strict; Max-Age${24 * 60 * 60}; Secure=${process.env.NODE_ENV === 'production'}`)
      const responseData: CustomLoginResponse = {
        // token: backendData.access_token,
        seller_id: backendData.seller_id,
        message: backendData.message,
        nome: backendData.nome,
      };

      return res.status(200).json(responseData);
    } else {
      return res
        .status(backendResponse.status)
        .json({ message: backendData.message });
    }
  } catch (error) {
    console.error("Erro na API de auth: ", error);
    return res.status(500).json({message: 'Erro interno no servidor'})
  }
}
