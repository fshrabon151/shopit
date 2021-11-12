import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';

import { MDBDataTable } from 'mdbreact';
import Loader from '../layouts/Loader';
import { useAlert } from 'react-alert';
import Sidebar from './Sidebar';

import { getAdminProducts, clearErrors } from '../../redux/actions/products';

const ProductsList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAdminProducts());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, dispatch, error]);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Price',
          field: 'price',
          sort: 'asc',
        },
        {
          label: 'Stock',
          field: 'stock',
          sort: 'asc',
        },
        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        stock: (
          <b className={product.stock > 0 ? 'text-success' : 'text-danger'}>
            {product.stock}
          </b>
        ),
        actions: (
          <>
            <Link
              to={`/admin/products/${product._id}`}
              className="btn btn-primary py-1 px-2"
            >
              {' '}
              <i className="fa fa-pencil"></i>
            </Link>
            <button className="btn btn-danger py-1 px-2 ml-2">
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });
    return data;
  };
  return (
    <>
      <MetaData title="All Products" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <>
            <h1 className="my-5">All Products</h1>
            {loading ? (
              <Loader />
            ) : (
              <>
                <MDBDataTable
                  data={setProducts()}
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

export default ProductsList;
