import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../env';

export type JWTPayload = { sub: string; email: string };

export function ensureAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'MissingAuthorization' });

  const [type, token] = header.split(' ');
  if (type !== 'Bearer' || !token) return res.status(401).json({ error: 'InvalidAuthorization' });

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as JWTPayload;
    (req as any).user = payload;
    return next();
  } catch {
    return res.status(401).json({ error: 'InvalidToken' });
  }
}
