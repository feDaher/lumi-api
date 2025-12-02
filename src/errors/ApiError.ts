export class ApiError extends Error {
  status: number;
  code: string;
  meta?: any;

  constructor(status: number, code: string, message: string, meta?: any) {
    super(message);

    // Garante que instanceof ApiError funcione corretamente
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.meta = meta;

    // Opcional, mas bom para stack trace mais limpa
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static badRequest(message = "Bad Request", meta?: any) {
    return new ApiError(400, "BAD_REQUEST", message, meta);
  }

  static unauthorized(message = "Unauthorized", meta?: any) {
    return new ApiError(401, "UNAUTHORIZED", message, meta);
  }

  static forbidden(message = "Forbidden", meta?: any) {
    return new ApiError(403, "FORBIDDEN", message, meta);
  }

  static notFound(message = "Not Found", meta?: any) {
    return new ApiError(404, "NOT_FOUND", message, meta);
  }

  static conflict(message = "Conflict", meta?: any) {
    return new ApiError(409, "CONFLICT", message, meta);
  }

  static internal(message = "Internal Server Error", meta?: any) {
    return new ApiError(500, "INTERNAL_SERVER_ERROR", message, meta);
  }
}
