import { NextFunction, Request, Response } from 'express';
import { SessionService } from '../modules/sessions/sessions.service';

export interface AuthUser {
  id: string;
  email: string;
  token: string
}

export async function ensureAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header)
    return res.status(401).json({ error: 'MissingAuthorization' });

  const [type, token] = header.split(' ');
  if (type !== 'Bearer' || !token)
    return res.status(401).json({ error: 'InvalidAuthorization' });

    try {

    const session = await SessionService.findSessionByToken(token);
    if (!session) {
      return res.status(401).json({ error: 'Session not found or expired', message: 'session expired' });
    }

    req.user = {
      id: session.user.id,
      email: session.user.email,
      //@ts-ignore
      token: session.token
    };

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'EternalServeErro' });
  }
  }