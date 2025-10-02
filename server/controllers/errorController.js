import AppError from "../utils/appError.js";
import getOperationalErrors from "../utils/getOperationalErrors.js";

function globalErrorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorForProd(err, req, res);
  }
}

function sendErrorForDev(err, req, res) {
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message,
    error: err,
    stack: err.stack,
  });
}

function sendErrorForProd(err, req, res) {
  const error = getOperationalErrors(err);

  if (error.isOperational) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "something went wrong",
  });
}

export default globalErrorHandler;
