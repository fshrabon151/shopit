import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from './CheckoutSteps';
import { useAlert } from 'react-alert';
import axios from 'axios';
import { createOrder, clearErrors } from '../../redux/actions/order';
import { v4 as uuidv4 } from 'uuid';

const Payment = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);
  const queryString = window.location.search;
  // `${process.env.FRONTEND_URL}/?status=${status}&tran_id=${tran_id}&card_type=${card_type}&card_brand=${card_brand}`
  const urlParams = new URLSearchParams(queryString);
  const status = urlParams.get('status') || null;
  const tran_id = urlParams.get('tran_id') || null;

  const success = urlParams.get('success') || null;

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  const productName = cartItems.map((item) => `${item.name}`).join(', ');

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const submitHandler = async (e) => {
    const tran_id = `shopit-${uuidv4()}`;
    localStorage.setItem('tran_id', JSON.stringify(tran_id));
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.set('total_amount', orderInfo.totalPrice);
      formData.set('tran_id', tran_id);
      formData.set('currency', 'BDT');
      formData.set('shipping_method', 'Courier');
      formData.set('product_name', productName);
      formData.set('product_category', 'various');
      formData.set('product_profile', 'general');
      formData.set('cus_name', user.name);
      formData.set('cus_email', user.email);
      formData.set('cus_add1', shippingInfo.address);
      formData.set('cus_add2', shippingInfo.address);
      formData.set('cus_city', shippingInfo.city);
      formData.set('cus_state', shippingInfo.city);
      formData.set('cus_postcode', shippingInfo.postalCode);
      formData.set('cus_country', shippingInfo.country);
      formData.set('cus_phone', shippingInfo.phoneNo);
      formData.set('cus_fax', shippingInfo.phoneNo);
      formData.set('ship_name', user.name);
      formData.set('ship_add1', shippingInfo.address);
      formData.set('ship_add2', shippingInfo.address);
      formData.set('ship_city', shippingInfo.city);
      formData.set('ship_postcode', shippingInfo.postalCode);
      formData.set('ship_country', shippingInfo.country);

      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      const {
        data: { data },
      } = await axios.post('/api/v1/payment/order', formData, config);

      if (data.status === 'SUCCESS') {
        window.location.replace(data.GatewayPageURL);
      }
    } catch (error) {
      console.log(error);
    }

    // navigate('/order/success');
  };

  useEffect(() => {
    if (
      success === 'true' &&
      tran_id === JSON.parse(localStorage.getItem('tran_id'))
    ) {
      order.paymentInfo = {
        id: tran_id,
        status,
      };
      dispatch(createOrder(order));
      localStorage.removeItem('tran_id');
      navigate('/success');
    } else if (success === 'fail') {
      alert.error('Transaction failed, Try again later');
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, dispatch, error, navigate, order, status, success, tran_id]);

  return (
    <>
      <MetaData title="Payment" />
      <CheckoutSteps shipping confirmOrder payment />

      <div className="row wrapper">
        <div className="container">
          <h2 className="text-dark text-center">Pay with SSLCommerz</h2>
          <hr />
          <img
            src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-01.png"
            className="img-fluid"
            alt=""
          />

          <hr />
          <button
            id="pay_btn"
            className="btn btn-block  text-light py-3 mt-5"
            style={{ background: '#fa9c23' }}
            onClick={submitHandler}
          >
            Pay With SSLCOMMERZ : {orderInfo && orderInfo.totalPrice} BDT
          </button>
        </div>
        {/* <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <input
                type="text"
                id="card_num_field"
                className="form-control"
                value=""
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <input
                type="text"
                id="card_exp_field"
                className="form-control"
                value=""
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <input
                type="text"
                id="card_cvc_field"
                className="form-control"
                value=""
              />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Pay {orderInfo && orderInfo.totalPrice}
            </button>
          </form>
        </div> */}
      </div>
    </>
  );
};

export default Payment;
