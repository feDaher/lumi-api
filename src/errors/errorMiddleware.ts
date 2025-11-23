import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { ApiError } from "./ApiError";
import { ErrorResponse } from "./ErrorResponse";
import { mapPrismaError } from "./errorMap";
import { logger } from "../logger";

export function errorMiddleware(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error(err);

  // ZOD
  if (err instanceof ZodError) {
    return res.status(400).json(
      ErrorResponse(400, "VALIDATION_ERROR", "Erro de validação", {
        issues: err.flatten(),
      })
    );
  }

  // PRISMA
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const mapped = mapPrismaError(err);
    return res.status(mapped.status).json(ErrorResponse(mapped.status, mapped.code, mapped.message, mapped.meta));
  }

  // ApiError custom
  if (err instanceof ApiError) {
    return res.status(err.status).json(ErrorResponse(err.status, err.code, err.message, err.meta));
  }

  // Fallback
  return res.status(500).json(
    ErrorResponse(500, "INTERNAL_SERVER_ERROR", "Erro inesperado")
  );
}
