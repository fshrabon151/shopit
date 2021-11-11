import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

import MetaData from '../layouts/MetaData';
import { resetPassword, clearErrors } from '../../redux/actions/auth';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const alert = useAlert();
  const { success, error, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success('Password has been updated successfully');
      navigate('/login');
    }
  }, [alert, dispatch, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('password', password);
    formData.set('confirmPassword', confirmPassword);
    dispatch(resetPassword(token, formData));
  };
  return (
    <>
      <MetaData title="Reset Password" />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">New Password</h1>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm_password_field">Confirm Password</label>
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              id="new_password_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              Set Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
