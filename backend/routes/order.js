const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');
const {
  createOrder,
  getOrder,
  myOrders,
  allOrders,
  updateOrders,
  deleteOrder,
} = require('../controllers/order');

router.route('/orders/new').post(isAuthenticatedUser, createOrder);
router.route('/orders/:id').get(isAuthenticatedUser, getOrder);
router.route('/orders').get(isAuthenticatedUser, myOrders);
router
  .route('/admin/orders')
  .get(isAuthenticatedUser, authorizedRoles('admin'), allOrders);
router
  .route('/admin/orders/:id')
  .put(isAuthenticatedUser, authorizedRoles('admin'), updateOrders);
router
  .route('/admin/orders/:id')
  .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteOrder);

module.exports = router;
