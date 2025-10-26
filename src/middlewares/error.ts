import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { logger } from '../logger';

export function errorMiddleware(err: any, _req: Request, res: Response, _next: NextFunction) {
  logger.error(err);

  if (err instanceof ZodError) {
    return res.status(400).json({ error: 'ValidationError', issues: err.flatten() });
  }

  if (err?.status) {
    return res.status(err.status).json({ error: err.name ?? 'Error', message: err.message });
  }

  return res.status(500).json({ error: 'InternalServerError' });
}
