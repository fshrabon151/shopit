import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../layouts/MetaData';

import {
  updateUser,
  loadUser,
  getUserDetails,
  clearErrors,
} from '../../redux/actions/auth';
import {
  UPDATE_USER_RESET,
  USER_DETAILS_RESET,
} from '../../redux/actions/types';
import Sidebar from './Sidebar';
import Loader from '../layouts/Loader';

const UpdateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.user);
  const { user, error: userError } = useSelector((state) => state.userDetails);
  const { id } = useParams();

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (isUpdated) {
      alert.success('User updated successfully');

      navigate('/admin/users');
      dispatch({ type: UPDATE_USER_RESET });
      dispatch({ type: USER_DETAILS_RESET });
    }
  }, [alert, dispatch, isUpdated, navigate, id, user]);

  if (error) {
    alert.error(error);
    dispatch(clearErrors());
    navigate('/admin/users');
  }
  if (userError) {
    alert.error(userError);
    dispatch(clearErrors());
    navigate('/admin/users');
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('role', role);
    dispatch(updateUser(id, formData));
  };
  return (
    <>
      <MetaData title="Update User" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <div class="row wrapper">
            <div class="col-10 col-lg-5">
              <form class="shadow-lg" onSubmit={submitHandler}>
                <h1 class="mt-2 mb-5">Update User</h1>

                <div class="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="name"
                    id="name_field"
                    class="form-control"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div class="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div class="form-group">
                  <label htmlFor="role_field">Role</label>

                  <select
                    id="role_field"
                    class="form-control"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  class="btn update-btn btn-block mt-4 mb-3"
                  disabled={loading ? true : false}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
