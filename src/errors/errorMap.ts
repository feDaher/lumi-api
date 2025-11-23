import { Prisma } from "@prisma/client";
import { ApiError } from "./ApiError";

export function mapPrismaError(err: Prisma.PrismaClientKnownRequestError) {
  switch (err.code) {
    case "P2002":
      return ApiError.conflict("Registro duplicado");

    case "P2025":
      return ApiError.notFound("Registro não encontrado");

    default:
      return new ApiError(400, "PRISMA_ERROR", err.message, { code: err.code });
  }
}
