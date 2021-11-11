const express = require('express');
const router = express.Router();
const {
  paymentInit,
  paymentSuccess,
  paymentFail,
  paymentCancel,
  paymentIpn,
} = require('../controllers/payment');

router.route('/payment/order').post(paymentInit);
router.route('/payment/success').post(paymentSuccess);
router.route('/payment/fail').post(paymentFail);
router.route('/payment/cancel').post(paymentCancel);
router.route('/payment/ipn').post(paymentIpn);

module.exports = router;
