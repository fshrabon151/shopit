const Order = require('../models/Order');
const Product = require('../models/Product');
const ErrorHandler = require('../utils/ErrorHandler');
const asyncHandler = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// @desc    Create a new order
// @route   POST /api/v1/orders/new
// @access  private
exports.createOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(200).json({ success: true, data: order });
});

// @desc    Get single order
// @route   GET /api/v1/orders/:id
// @access  private
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (!order) {
    return next(new ErrorHandler('No order found with this ID', 404));
  }
  res.status(200).json({ success: true, data: order });
});

// @desc    Get looged in user order
// @route   GET /api/v1/orders
// @access  private
exports.myOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });
  if (!orders) {
    return next(new ErrorHandler('No order found', 404));
  }
  res.status(200).json({ success: true, data: orders });
});

// @desc    Get all orders - ADMIN
// @route   GET /api/v1/admin/orders
// @access  private
exports.allOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();
  if (!orders) {
    return next(new ErrorHandler('No order found', 404));
  }
  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res
    .status(200)
    .json({ success: true, count: orders.length, totalAmount, orders });
});

// @desc    Update/Process orders - ADMIN
// @route   PUT /api/v1/admin/orders/:id
// @access  private
exports.updateOrders = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler('No order found', 404));
  }

  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('You have already delivered this order', 400));
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();
  await order.save();

  res.status(200).json({ success: true, order });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  if (product) {
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false });
  }
}

// @desc    Delete order
// @route   DELETE /api/v1/admin/orders/:id
// @access  private
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler('No order found with this ID', 404));
  }
  await order.remove();
  res.status(200).json({ success: true });
});
