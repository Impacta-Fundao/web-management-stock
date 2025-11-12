import {
  getTokenFromCookies,
  makeAuthenticatedRequest,
} from "@/lib/auth-helper";
import { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/navigation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const token = getTokenFromCookies(req);
  if (!token) {
    res.status(401).json({ message: "Não Autorizado" });
    redirect("/");
  }

  try {
    if (!id) return res.status(400).json({ message: "id não foi passado" });
    const backendResponse = await makeAuthenticatedRequest(
      req,
      `/products/${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await backendResponse.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao buscar produtos: ", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}
