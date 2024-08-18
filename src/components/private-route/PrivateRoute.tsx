import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import apiService from '../../api.service';

const PrivateRoute = () => {
  const isLoggedIn = !!apiService.getToken();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
