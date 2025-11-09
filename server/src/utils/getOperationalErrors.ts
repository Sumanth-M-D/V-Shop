import type { MongoServerError } from "mongodb";
import AppError from "./appError.js";

type MongooseCastError = Error & {
  name: "CastError";
  path?: string;
  value?: unknown;
};

type MongooseValidationError = Error & {
  name: "ValidationError";
  errors?: Record<string, { message: string }>;
};

type JsonWebTokenError = Error & {
  name: "JsonWebTokenError" | "TokenExpiredError";
};

type DuplicateKeyError = MongoServerError & {
  keyValue?: Record<string, unknown>;
};

type OperationalErrorInput =
  | AppError
  | MongooseCastError
  | MongooseValidationError
  | JsonWebTokenError
  | DuplicateKeyError;

function isCastError(error: unknown): error is MongooseCastError {
  return Boolean(error) && (error as MongooseCastError).name === "CastError";
}

function isDuplicateKeyError(error: unknown): error is DuplicateKeyError {
  return Boolean(error) && (error as DuplicateKeyError).code === 11000;
}

function isValidationError(error: unknown): error is MongooseValidationError {
  return Boolean(error) && (error as MongooseValidationError).name === "ValidationError";
}

function isJwtError(error: unknown): error is JsonWebTokenError {
  return (
    Boolean(error) &&
    ["JsonWebTokenError", "TokenExpiredError"].includes((error as JsonWebTokenError).name)
  );
}

export default function getOperationalErrors(err: OperationalErrorInput | Error): AppError | Error {
  if (err instanceof AppError) {
    return err;
  }

  if (isCastError(err)) {
    return new AppError(`Invalid ${err.path}: ${String(err.value)}`, 400);
  }

  if (isDuplicateKeyError(err)) {
    const duplicateValue = err.keyValue ? Object.values(err.keyValue)[0] : "value";
    return new AppError(`Duplicate field: ${duplicateValue}. Please use another value`, 400);
  }

  if (isValidationError(err)) {
    const message = err.errors
      ? Object.values(err.errors)
          .map((error) => error.message)
          .join(". ")
      : err.message;
    return new AppError(`Invalid input data: ${message}`, 401);
  }

  if (isJwtError(err)) {
    const message =
      err.name === "TokenExpiredError"
        ? "Your token has expired. Please login again."
        : "Invalid token please login again.";
    return new AppError(message, 401);
  }

  return err;
}
