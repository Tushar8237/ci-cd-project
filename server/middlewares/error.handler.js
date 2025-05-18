export const errorHandler = (err, req, res, next) => {
  console.log("Error caught in handler:", err);  // <-- add this line
  // Use the status code from the error or default to 500
  let statusCode = err.statusCode || 500;
  // Use the message from the error or default to a generic message
  let message = err.message || "Something went wrong";

  if (err.headersSent) {
    return next(err);
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ID format: ${err.value}`;
  }

  // Handle duplicate key errors
  if (err.code === 11000) {
    message = `Duplicate field value entered: ${Object.keys(err.keyValue).join(
      ", "
    )}`;
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
