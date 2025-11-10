import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import {parse} from 'cookie';

export function getTokenFromCookies(req:NextApiRequest): string | null {
    const cookies = parse(req.headers.cookie || '');
    return cookies.auth_token || null;
}

export async function makeAuthenticatedRequest(req: NextApiRequest, endpoint: string, options: RequestInit = {}) {
  const token = getTokenFromCookies(req);
  
  if (!token) {
    NextResponse.redirect('/');
    throw new Error('Não autenticado');
  }

  const response = await fetch(`${process.env.API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  return response;
}