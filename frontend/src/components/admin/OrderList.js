import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';

import { MDBDataTable } from 'mdbreact';
import Loader from '../layouts/Loader';
import { useAlert } from 'react-alert';
import Sidebar from './Sidebar';
import {
  getAllOrders,
  clearErrors,
  deleteOrder,
} from '../../redux/actions/order';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { DELETE_ORDERS_RESET } from '../../redux/actions/types';

const OrderList = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { isDeleted, error: orderDeleteError } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getAllOrders());
    if (isDeleted) {
      alert.success('Order deleted successfully');

      navigate('/admin/orders');
      dispatch({ type: DELETE_ORDERS_RESET });
    }
  }, [dispatch, alert, isDeleted, navigate]);

  if (error) {
    alert.error(error);
    dispatch(clearErrors());
  }
  if (orderDeleteError) {
    alert.error(orderDeleteError);
    dispatch(clearErrors());
  }

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: 'Order ID',
          field: 'id',
          sort: 'asc',
        },

        {
          label: 'No of Items',
          field: 'numOfItems',
          sort: 'asc',
        },
        {
          label: 'Amount',
          field: 'amount',
          sort: 'asc',
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc',
        },

        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,

        numOfItems: order.orderItems.length,

        amount: `$${order.totalPrice}`,
        stock: (
          <b className={order.stock > 0 ? 'text-success' : 'text-danger'}>
            {order.stock}
          </b>
        ),

        status:
          order.orderStatus &&
          String(order.orderStatus).includes('Delivered') ? (
            <p className="text-success">{order.orderStatus}</p>
          ) : String(order.orderStatus).includes('Shipped') ? (
            <p className="text-warning">{order.orderStatus}</p>
          ) : (
            <p className="text-primary">{order.orderStatus}</p>
          ),
        actions: (
          <>
            <Link
              to={`/admin/orders/${order._id}`}
              className="btn btn-primary py-1 px-2"
            >
              {' '}
              <i className="fa fa-eye"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteOrderHandler(order._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });
    return data;
  };

  const deleteOrderHandler = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => dispatch(deleteOrder(id)),
        },
        {
          label: 'No',
        },
      ],
    });
  };
  return (
    <>
      <MetaData title="All orders" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <>
            <h1 className="my-5">All orders</h1>
            {loading ? (
              <Loader />
            ) : (
              <>
                <MDBDataTable
                  data={setOrders()}
                  className="px-3"
                  bordered
                  striped
                  hover
                />
              </>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default OrderList;
