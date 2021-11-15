const SSLCommerzPayment = require('sslcommerz-lts');
const asyncHandler = require('../middlewares/catchAsyncErrors');
const { v4: uuidv4 } = require('uuid');

exports.paymentInit = asyncHandler(async (req, res, next) => {
  let data = req.body;
  data.success_url = `${req.protocol}://${req.get('host')}/api/v1/payment/success`;
  data.fail_url = `${req.protocol}://${req.get('host')}/api/v1/payment/fail`;
  data.cancel_url = `${req.protocol}://${req.get('host')}/api/v1/payment/cancel`;
  data.ipn_url = `${req.protocol}://${req.get('host')}/api/v1/payment/ipn`;

  const sslcz = new SSLCommerzPayment(
    process.env.STORE_ID,
    process.env.STORE_PASSWORD,
    false
  );
  sslcz.init(data).then((data) => {
    res.status(200).json({ data });
  });
});

exports.paymentSuccess = asyncHandler(async (req, res, next) => {
  const { tran_id, card_type, card_brand, status } = req.body;

  res.redirect(
    `${req.protocol}://${req.get('host')}/order/payment/?success=true&status=succeeded&tran_id=${tran_id}&card_type=${card_type}&card_brand=${card_brand}`
  );
});

exports.paymentFail = asyncHandler(async (req, res, next) => {
  const { tran_id, card_type, card_brand, status } = req.body;
  res.redirect(
    `${req.protocol}://${req.get('host')}/order/payment/?success=fail&status=failed&tran_id=${tran_id}&card_type=${card_type}&card_brand=${card_brand}`
  );
});
exports.paymentCancel = asyncHandler(async (req, res, next) => {
  const { tran_id, card_type, card_brand, status } = req.body;
  res.redirect(
    `${req.protocol}://${req.get('host')}/order/payment/?success=true&status=succeeded&tran_id=${tran_id}&card_type=${card_type}&card_brand=${card_brand}`
  );
});

exports.paymentIpn = asyncHandler(async (req, res, next) => {
  const { tran_id, card_type, card_brand, status } = req.body;
  res.redirect(
    `${req.protocol}://${req.get('host')}/order/payment/?success=true&status=succeeded&tran_id=${tran_id}&card_type=${card_type}&card_brand=${card_brand}`
  );
});
