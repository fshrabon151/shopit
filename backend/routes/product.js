const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products');

const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');

router.route('/products').get(getProducts);
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
