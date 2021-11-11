import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../layouts/Loader';

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.auth);
  return loading ? (
    <Loader />
  ) : isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
