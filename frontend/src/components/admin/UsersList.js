import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';

import { MDBDataTable } from 'mdbreact';
import Loader from '../layouts/Loader';
import { useAlert } from 'react-alert';
import Sidebar from './Sidebar';
import { getAllUser, clearErrors } from '../../redux/actions/auth';

const UsersList = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.allUsers);
  // const { error: deleteError, isDeleted } = useSelector(
  //   (state) => state.user
  // );

  useEffect(() => {
    dispatch(getAllUser());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    // if (deleteError) {
    //   alert.error(deleteError);
    //   dispatch(clearErrors());
    // }
    // if (isDeleted) {
    //   alert.success('user deleted successfully');
    //   navigate('/admin/products');
    //   dispatch({ type: DELETE_PRODUCT_RESET });
    // }
  }, [alert, dispatch, error, navigate]);

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: 'User ID',
          field: 'id',
          sort: 'asc',
        },

        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Email',
          field: 'email',
          sort: 'asc',
        },
        {
          label: 'Role',
          field: 'role',
          sort: 'asc',
        },

        {
          label: 'Avatar',
          field: 'avatar',
          sort: 'asc',
        },

        {
          label: 'Actions',
          field: 'actions',
        },
      ],
      rows: [],
    };

    users.forEach((user) => {
      data.rows.push({
        id: user._id,

        name: user.name,
        email: user.email,
        role: user.role,
        avatar: (
          <img src={user.avatar.url} alt={user.name} width="50" height="52" />
        ),

        actions: (
          <>
            <Link
              to={`/admin/users/${user._id}`}
              className="btn btn-primary py-1 px-2"
            >
              {' '}
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              // onClick={() => deleteProductHandler(user._id)}
            >
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
      <MetaData title="All Users" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <>
            <h1 className="my-5">All Users</h1>
            {loading ? (
              <Loader />
            ) : (
              <>
                <MDBDataTable
                  data={setUsers()}
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

export default UsersList;
