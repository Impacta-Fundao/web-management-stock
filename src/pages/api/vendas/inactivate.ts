import {
  getTokenFromCookies,
  makeAuthenticatedRequest,
} from "@/lib/auth-helper";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    const token = getTokenFromCookies(req);
    if (!token) {
      return res.status(401).json({ message: "Não Autorizado" });
    }

    if (!id)
      return res
        .status(401)
        .json({ message: "Passe o id, nao há nenhum passado" });
    const backendResponse = await makeAuthenticatedRequest(
      req,
      `/sales/${id}/inactivate`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await backendResponse.json();
    console.log(data)
    if (!backendResponse.ok) {
      return res
        .status(402)
        .json({ message: `${data.message || backendResponse.status}` });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao buscar produtos: ", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}
