import { NextApiRequest, NextApiResponse } from 'next';
import { getTokenFromCookies, makeAuthenticatedRequest } from '@/lib/auth-helper';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = getTokenFromCookies(req);
  
  if (!token) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  try {
    const backendResponse = await makeAuthenticatedRequest(req, '/mercados', {
      method: 'GET'
    });

    const data = await backendResponse.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao buscar sellers:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}