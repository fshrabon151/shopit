import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';

import MetaData from '../layouts/MetaData';
import { forgotPassword, clearErrors } from '../../redux/actions/auth';

const ForgotPassword = () => {
  const alert = useAlert();
  const { message, error, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  useEffect(() => {

    if (message) {
      alert.success(message);
    }
  }, [alert, dispatch, message]);
  if (error) {
    alert.error(error);
    dispatch(clearErrors());
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('email', email);
    dispatch(forgotPassword(formData));
  };
  return (
    <>
      <MetaData title="Forgot Password" />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Forgot Password</h1>
            <div className="form-group">
              <label htmlFor="email_field">Enter Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
