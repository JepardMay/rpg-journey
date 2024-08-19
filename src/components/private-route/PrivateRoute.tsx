
import React, { useContext } from 'react'; import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('PrivateRoute must be used within an AuthProvider');
  }

  const { isLoggedIn } = authContext;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
