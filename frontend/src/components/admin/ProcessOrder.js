import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../layouts/Loader';
import { useAlert } from 'react-alert';
import Sidebar from './Sidebar';
import {
  getOrderDetails,
  updateOrder,
  clearErrors,
} from '../../redux/actions/order';
import { UPDATE_ORDERS_RESET } from '../../redux/actions/types';

const ProcessOrder = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, order, error } = useSelector((state) => state.orderDetails);

  const { error: orderProcessError, isUpdated } = useSelector(
    (state) => state.order
  );
  const { orderId } = useParams();

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
    if (isUpdated) {
      alert.success('Order updated successfully');
      navigate('/admin/orders');
      dispatch({ type: UPDATE_ORDERS_RESET });
    }
  }, [dispatch, orderId, alert, isUpdated, navigate]);

  if (orderProcessError) {
    alert.error(orderProcessError);
    dispatch(clearErrors());
  }
  if (error) {
    alert.error(error);
    dispatch(clearErrors());
  }

  const updateOrderHandler = (id) => {
    const formData = new FormData();
    formData.set('status', status);
    dispatch(updateOrder(id, formData));
  };
  const isPaid =
    order && order.paymentInfo.status === 'succeeded' ? true : false;

  return (
    <>
      <MetaData title={`Process Order # ${orderId}`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <>
            {loading ? (
              <Loader />
            ) : (
              <>
                {order && (
                  <div className="row d-flex justify-content-around">
                    <div className="col-12 col-lg-7 order-details">
                      <h3 className="mb-3 mt-5">Order # {orderId}</h3>

                      <h4 className="mb-4">Shipping Info</h4>
                      <p>
                        <b>Name:</b> {order.user.name}
                      </p>
                      <p>
                        <b>Phone:</b> {order.shippingInfo.phoneNo}
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

                      <h4 className="my-4">Transaction ID</h4>
                      <p className="greenColor">
                        <b>{order.paymentInfo.id}</b>
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

                    <div className="col-12 col-lg-3 mt-5">
                      <h4 className="my-4">Status</h4>

                      <div className="form-group">
                        <select
                          className="form-control"
                          name="status"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>

                      <button
                        className="btn btn-primary btn-block"
                        onClick={() => updateOrderHandler(order._id)}
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;
