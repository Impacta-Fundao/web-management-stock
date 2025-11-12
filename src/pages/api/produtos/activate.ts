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
  const token = getTokenFromCookies(req);
  if (!token) redirect("/");

  const { id } = req.query;
  try {
    const respo = await makeAuthenticatedRequest(
      req,
      `/products/${id}/activate`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "aplication/json",
        },
      }
    );
    const data = await respo.json();
    if (!respo.ok)
      return res.status(respo.status).json({
        message: data.message || `Erro ${respo.status}`,
      });
    return res.status(respo.status).json({
      data,
    });
  } catch (error) {
    const err = error as Error;
    console.error("Erro interno do servidor");
    return res.status(500).json({
      message: "Erro interno",
      error: err.message,
    });
  }
}
