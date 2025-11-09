type ErrorStatus = "fail" | "error";

export type ErrorContext = Record<string, unknown>;

class AppError extends Error {
  public readonly statusCode: number;
  public readonly status: ErrorStatus;
  public readonly isOperational: boolean;
  public readonly context: ErrorContext;

  constructor(message: string, statusCode = 400, context: ErrorContext = {}) {
    super(message);

    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.context = context;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
