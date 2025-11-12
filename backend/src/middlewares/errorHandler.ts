import { AppError } from "@utils";
import { logger } from "@lib";

export const errorHandler = (err: any, req: any, res: any, next: any) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
    statusCode: err.statusCode || 500,
  });

  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";

  if (
    ["TokenExpiredError", "JsonWebTokenError", "NotBeforeError"].includes(
      err.name
    )
  ) {
    return res.status(401).json({ message: "Access Token invalid or expired" });
  }

  const message = isProduction
    ? err instanceof AppError
      ? err.message
      : "Internal Server Error"
    : err.message;

  res.status(statusCode).json({ message });
};

export const notFound = (req: any, res: any, next: any) => {
  logger.warn({
    message: "API endpoint not found",
    path: req.originalUrl,
    method: req.method,
  });

  res.status(404).json({ message: "API endpoint not found" });
};
