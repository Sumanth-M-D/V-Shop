import AppError from "../utils/appError.js";

// ------------------ GLOBAL ERROR HANDLER ----------------------------
function globalErrorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500; // Default status code
  err.status = err.status || "error"; // Default status

  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorForProd(err, req, res);
  }
}

/*


*/
// ------------------ HELPER FUNCTIONS ----------------------------

// For Development => send complete error details
function sendErrorForDev(err, req, res) {
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message,
    error: err,
    stack: err.stack,
  });
}
/*


*/

// For Production => send only status and message
function sendErrorForProd(err, req, res) {
  // Identifying operational errors
  const error = getOperationalErrors(err);

  // If error is operational, then send error details
  if (error.isOperational) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }

  // If error is programattic, then send generic message
  return res.status(500).json({
    status: "error",
    message: "something went wrong",
  });
}
/*


*/

// Identifying operational errors
function getOperationalErrors(err) {
  // invalid "id" field for getProduct
  if (err.name === "CastError") {
    return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
  }

  // duplicate email
  if (err.code === 11000) {
    return new AppError(
      `Duplicate field : ${err.keyValue.email}. Please use another value`,
      400
    );
  }

  //DB validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((error) => error.message)
      .join(". ");
    return new AppError(`Invalid input data: ${message}`, 401);
  }

  return err;
}

export default globalErrorHandler;
