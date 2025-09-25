// frontend/src/components/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  // If not logged in, always redirect to the '/admin' login page.
  return isAuthenticated ? children : <Navigate to="/admin" />;
};
export default PrivateRoute;