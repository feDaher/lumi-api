import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { ApiError } from "./ApiError";
import { Request, Response, NextFunction } from "express";

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("ERROR:", err);

  if (err instanceof ZodError) {
    const firstIssue = err.issues[0];

    return res.status(400).json({
      success: false,
      status: 400,
      code: firstIssue?.code ?? "invalid_format",
      message: firstIssue?.message ?? "Erro de validação",
      field: firstIssue?.path?.[0] ?? null,
      issues: err.issues,
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      const meta = err.meta ?? {};
      const target = meta.target as string[] | string | undefined;

      const field = Array.isArray(target)
        ? target[0]
        : typeof target === "string"
          ? target
          : undefined;

      return res.status(409).json({
        success: false,
        status: 409,
        code: "UNIQUE_CONSTRAINT",
        message: `${target} já existe`,
        field,
      });
    }
  }

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      success: false,
      status: err.status,
      code: err.code,
      message: err.message,
      ...(err.meta && { meta: err.meta }),
    });
  }

  const message =
    err instanceof Error ? err.message : "Erro inesperado no servidor";

  return res.status(500).json({
    success: false,
    status: 500,
    code: "INTERNAL_SERVER_ERROR",
    message,
  });
}
