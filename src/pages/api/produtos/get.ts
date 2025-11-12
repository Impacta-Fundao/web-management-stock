import {
  getTokenFromCookies,
  makeAuthenticatedRequest,
} from "@/lib/auth-helper";
import { NextApiRequest, NextApiResponse } from "next";
import { redirect, useRouter } from "next/navigation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = getTokenFromCookies(req);
  if (!token) {
    res.status(401).json({ message: "Não Autorizado" });
    redirect("/");
  }

  try {
    const backendResponse = await makeAuthenticatedRequest(req, "/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await backendResponse.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao buscar produtos: ", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}
