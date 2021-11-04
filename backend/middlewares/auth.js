const ErrorHandler = require('../utils/ErrorHandler');
const asyncHandler = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Check user is authenticated or not.
exports.isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler('Login first to access this resource', 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

// Handlig users roles

exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
