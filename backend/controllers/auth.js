const User = require('../models/User');
const ErrorHandler = require('../utils/ErrorHandler');
const asyncHandler = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// @desc    Register an user
// @route   POST /api/v1/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'avatars/avatar.75901876_nsv6wx',
      url: 'https://res.cloudinary.com/fshrabon/image/upload/v1636005095/avatars/avatar.75901876_nsv6wx.png',
    },
  });
  sendToken(user, 200, res);
});

// @desc    Login user
// @route   POST /api/v1/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //   Check if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler('Please enter email and password', 400));
  }
  //   finding user in database
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }
  //   check is password is correct or not
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }
  sendToken(user, 200, res);
});

// @desc    Get current user
// @route   GET /api/v1/me
// @access  private
exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
});

// @desc    Update/Change password
// @route   PUT /api/v1/password/update
// @access  private

exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  //Check previous user's password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler(`Old password is incorrect`, 400));
  }
  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
});

// @desc    Update user profile
// @route   PUT /api/v1/me/update
// @access  private

exports.updateProfile = asyncHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  // Update avatar : TODO
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ sucess: true, data: user });
});

// @desc    logout user
// @route   GET /api/v1/logout
// @access  private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: 'Loggoed out' });
});

// @desc    Forget password
// @route   POST /api/v1/password/forgot
// @access  private
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler('No user found with this email', 404));
  }
  // get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  // Create reset password url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset as follows: \n\n ${resetUrl} \nToken will be expires within ${process.env.RESET_PASSWORD_TOKEN_EXPIRES} mins, If you have not requested this email, then ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'ShopIt Password Recovery',
      message,
    });
    res
      .status(200)
      .json({ success: true, data: `Email sent to : ${user.email}` });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// @desc    Reset password
// @route   PUT /api/v1/password/reset/:token
// @access  private
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        `Password reset token is invalid or has been expired`,
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler(`Password does not match`, 400));
  }

  // Setup new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});

// Admin routes

// @desc    Get all users
// @route   GET /api/v1/admin/users
// @access  private

exports.allUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: true, data: users });
});

// @desc    Get indivisual user details
// @route   GET /api/v1/admin/users/:id
// @access  private

exports.getUserDetails = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: user });
});

// @desc    Update user profile
// @route   PUT /api/v1/admin/user/:id
// @access  private

exports.updateUser = asyncHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  // Update avatar : TODO
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ sucess: true, data: user });
});

// @desc    Delete user
// @route   DELETE /api/v1/admin/user/:id
// @access  private

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id ${req.params.id}`, 404)
    );
  }
  // Remove avatar from cloudinary - TODO
  await user.remove();
  res.status(200).json({ success: true, data: {} });
});
