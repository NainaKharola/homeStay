const errorHandler = (err, req, res, next) => {
  console.error("Unhandled Server Error:", err);

  const statusCode =
    res.statusCode && res.statusCode !== 200
      ? res.statusCode
      : err.statusCode || err.status || 500;

  const isProduction = process.env.NODE_ENV === "production";

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(isProduction ? {} : { stack: err.stack }),
  });
};

module.exports = errorHandler;
