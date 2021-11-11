import React from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../layouts/MetaData';
import successImage from '../../images/order_success.png';

const OrderSuccess = () => {
  return (
    <>
      <MetaData title="Order Success" />
      <div className="row justify-content-center">
        <div className="col-6 mt-5 text-center">
          <img
            className="my-5 img-fluid d-block mx-auto"
            src={successImage}
            alt="Order Success"
            width="200"
            height="200"
          />

          <h2>Your Order has been placed successfully.</h2>

          <Link to="/order">Go to Orders</Link>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
