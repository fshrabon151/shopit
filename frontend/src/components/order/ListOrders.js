import React, { useEffect } from 'react';
import { Link, } from 'react-router-dom';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';

import { MDBDataTable } from 'mdbreact';
import Loader from '../layouts/Loader';
import { useAlert } from 'react-alert';
import { myOrders, clearErrors } from '../../redux/actions/order';

const ListOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

  }, [alert, dispatch]);
  if (error) {
    alert.error(error);
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
          label: 'Num of Items',
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
          sort: 'asc',
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
            String(order.orderStatus).includes('Delivered') ? (
            <p className="text-success">{order.orderStatus}</p>
          ) : (
            <p className="text-danger">{order.orderStatus}</p>
          ),
        actions: (
          <Link to={`/orders/${order._id}`} className="btn btn-primary">
            {' '}
            <i className="fa fa-eye"></i>{' '}
          </Link>
        ),
      });
    });
    return data;
  };
  return (
    <>
      <MetaData title="My Orders" />
      <h1 className="mt-5">My Orders</h1>
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
  );
};

export default ListOrders;
