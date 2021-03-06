const ErrorHandler = require('../utils/ErrorHandler');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === 'PRODUCTION') {
    let error = { ...err };
    error.message = err.message;

    // Wrong mongoose Object Id error
    if (err.name === 'CastError') {
      const message = `Resourse not found. Invalid : ${err.path}`;
      error = new ErrorHandler(message, 400);
    }
    // Handling mongoose valdation error
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map((err) => err.message);
      error = new ErrorHandler(message, 400);
    }
    // Handling mongoose duplicate key errors
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }
    // Handling wrong JWT errors
    if (err.name === 'JsonWebTokenError') {
      const message = `JSON Web Token is invalid, Try Again!!`;
      error = new ErrorHandler(message, 400);
    }
    // Handling wrong JWT errors
    if (err.name === 'TokenExpiredError') {
      const message = `JSON Web Token is expired, Try Again!!`;
      error = new ErrorHandler(message, 400);
    }
    res.status(error.statusCode).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};
