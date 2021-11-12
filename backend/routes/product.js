const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createOrUpdateProductReview,
  getProductReviews,
  getAdminProducts,
  deleteReview,
} = require('../controllers/products');

const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');

router.route('/review').put(isAuthenticatedUser, createOrUpdateProductReview);

router
  .route('/reviews')
  .get(isAuthenticatedUser, getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);
router.route('/products').get(getProducts);
router
  .route('/admin/products')
  .get(isAuthenticatedUser, authorizedRoles('admin'), getAdminProducts);
router.route('/products/:id').get(getProduct);
router
  .route('/admin/products')
  .post(isAuthenticatedUser, authorizedRoles('admin'), createProduct);
router
  .route('/admin/products/:id')
  .put(isAuthenticatedUser, authorizedRoles('admin'), updateProduct);
router
  .route('/admin/products/:id')
  .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteProduct);

module.exports = router;
