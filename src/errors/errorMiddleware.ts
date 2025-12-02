import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { ApiError } from "./ApiError";

export function errorMiddleware(err, req, res, next) {
  console.error("🔥 ERROR:", err);

  if (err instanceof ZodError) {
    const first = err.issues[0];
    console.error({first});
    return res.status(400).json({
      success: false,
      status: 400,
      code: first.code ?? 'invalid_format',
      message: first?.message ?? "Erro de validação",
      field: first?.path?.[0],
      issues: err.issues,
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({
        success: false,
        status: 409,
        code: "UNIQUE_CONSTRAINT",
        message: `${err.meta?.target} já existe`,
        field: err.meta?.target?.[0],
      });
    }
  }

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      success: false,
      status: err.status,
      code: err.code,
      message: err.message,
      ...(err.meta ? { meta: err.meta } : {}),
    });
  }

  return res.status(500).json({
    success: false,
    status: 500,
    code: "INTERNAL_SERVER_ERROR",
    message: err.message ?? "Erro inesperado no servidor",
  });
}
