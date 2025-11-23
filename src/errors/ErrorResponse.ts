export function ErrorResponse(
  status: number,
  code: string,
  message: string,
  meta?: any
) {
  return {
    success: false,
    status,
    code,
    message,
    ...(meta ? { meta } : {}),
  };
}
