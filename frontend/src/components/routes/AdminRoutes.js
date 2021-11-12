import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../layouts/Loader';

const AdminRoutes = ({ children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);
  return loading ? (
    <Loader />
  ) : isAuthenticated && user.role === 'admin' ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoutes;
