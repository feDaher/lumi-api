export class ApiError extends Error {
  status: number;
  code: string;
  meta?: any;

  constructor(status: number, code: string, message: string, meta?: any) {
    super(message);
    this.status = status;
    this.code = code;
    this.meta = meta;
  }

  static badRequest(message = "Bad Request") {
    return new ApiError(400, "BAD_REQUEST", message);
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError(401, "UNAUTHORIZED", message);
  }

  static forbidden(message = "Forbidden") {
    return new ApiError(403, "FORBIDDEN", message);
  }

  static notFound(message = "Not Found") {
    return new ApiError(404, "NOT_FOUND", message);
  }

  static conflict(message = "Conflict") {
    return new ApiError(409, "CONFLICT", message);
  }

  static internal(message = "Internal Server Error") {
    return new ApiError(500, "INTERNAL_SERVER_ERROR", message);
  }
}
