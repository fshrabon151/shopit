const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  getUserProfile,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} = require('../controllers/auth');
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/password/reset/:token').put(resetPassword);

router
  .route('/admin/users')
  .get(isAuthenticatedUser, authorizedRoles('admin'), allUsers);
router
  .route('/admin/users/:id')
  .get(isAuthenticatedUser, authorizedRoles('admin'), getUserDetails)
  .put(isAuthenticatedUser, authorizedRoles('admin'), updateUser)
  .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteUser);

module.exports = router;
