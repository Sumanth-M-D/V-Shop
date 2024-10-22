class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;

    // Fail -> for client side errors | error -> for server side errors
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    // Expected operational errors
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
