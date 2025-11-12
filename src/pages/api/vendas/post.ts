import {
  getTokenFromCookies,
  makeAuthenticatedRequest,
} from "@/lib/auth-helper";
import { VendasRegister } from "@/models/vendas/types/vendas-props-model";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { produtoId, quantidade }: VendasRegister = req.body;
  const token = getTokenFromCookies(req);
  if (!token) NextResponse.redirect("/");
  if (!produtoId || !quantidade) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios" });
  }
  try {
    const resp = await makeAuthenticatedRequest(req, "/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ produtoId, quantidade: quantidade }),
    });
    console.log("Quantidade", quantidade);
    const data = await resp.json();
    if (!resp.ok)
      return res
        .status(400)
        .json({ message: `${data.message || resp.status}` });

    return res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    return res.status(400).json({ message: err.message });
  }
}
