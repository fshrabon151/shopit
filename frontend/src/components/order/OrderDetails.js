import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../layouts/Loader';
import { useAlert } from 'react-alert';
import { getOrderDetails, clearErrors } from '../../redux/actions/order';

const OrderDetails = () => {
  const { id } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, order } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    dispatch(getOrderDetails(id));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, dispatch, error, id]);

  const isPaid =
    order && order.paymentInfo.status === 'succeeded' ? true : false;
  return (
    <>
      <MetaData title="Product Details" />
      {loading ? (
        <Loader />
      ) : (
        order && (
          <>
            <div className="row d-flex justify-content-between">
              <div className="col-12 col-lg-8 mt-5 order-details">
                <h1 className="my-5">Order # {order._id}</h1>

                <h4 className="mb-4">Shipping Info</h4>
                <p>
                  <b>Name:</b> {order.user.name}
                </p>
                <p>
                  <b>Phone:</b>{' '}
                  {order.shippingInfo && order.shippingInfo.phoneNo}
                </p>
                <p className="mb-4">
                  <b>Address: </b>
                  {`${order.shippingInfo.address} , ${order.shippingInfo.city}, ${order.shippingInfo.postalCode}, ${order.shippingInfo.country}`}
                </p>
                <p>
                  <b>Amount:</b> ${order.totalPrice}
                </p>

                <hr />

                <h4 className="my-4">Payment</h4>
                <p className={isPaid ? 'greenColor' : 'redColor'}>
                  <b>{isPaid ? 'PAID' : 'NOT PAID'}</b>
                </p>

                <h4 className="my-4">Order Status:</h4>
                <p
                  className={
                    order.orderStatus &&
                    String(order.orderStatus).includes('Delivered')
                      ? 'greenColor'
                      : 'redColor'
                  }
                >
                  <b>{order.orderStatus}</b>
                </p>

                <h4 className="my-4">Order Items:</h4>

                <hr />
                <div className="cart-item my-1">
                  {order.orderItems &&
                    order.orderItems.map((orderItem) => (
                      <div className="row my-5" key={orderItem._id}>
                        <div className="col-4 col-lg-2">
                          <img
                            src={orderItem.image}
                            alt={orderItem.name}
                            height="45"
                            width="65"
                          />
                        </div>

                        <div className="col-5 col-lg-5">
                          <Link to={`/products/${orderItem.product}`}>
                            {orderItem.name}
                          </Link>
                        </div>

                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p>${orderItem.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <p>{orderItem.quantity} Piece(s)</p>
                        </div>
                      </div>
                    ))}
                </div>
                <hr />
              </div>
            </div>
          </>
        )
      )}
    </>
  );
};

export default OrderDetails;
