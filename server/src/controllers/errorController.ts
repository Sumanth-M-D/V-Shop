import type { NextFunction, Request, Response } from "express";
import getOperationalErrors from "../utils/getOperationalErrors.js";
import AppError from "../utils/appError.js";

type ExpressError = AppError & {
  statusCode?: number;
  status?: string;
  stack?: string;
  isOperational?: boolean;
};

function sendErrorForDev(err: ExpressError, res: Response): void {
  res.status(err.statusCode ?? 500).json({
    status: err.status ?? "error",
    message: err.message,
    error: err,
    stack: err.stack,
  });
}

function sendErrorForProd(err: ExpressError, res: Response): void {
  const error = getOperationalErrors(err);

  if (error instanceof AppError && error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
    return;
  }

  res.status(500).json({
    status: "error",
    message: "something went wrong",
  });
}

function globalErrorHandler(err: ExpressError, _req: Request, res: Response, _next: NextFunction): void {
  err.statusCode = err.statusCode ?? 500;
  err.status = err.status ?? "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorForProd(err, res);
  } else {
    sendErrorForDev(err, res);
  }
}

export default globalErrorHandler;
