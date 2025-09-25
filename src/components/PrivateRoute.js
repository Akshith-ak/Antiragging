// frontend/src/components/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');

  // If the user is NOT authenticated, always send them to the '/admin' login page.
  return isAuthenticated ? children : <Navigate to="/admin" />;
};

export default PrivateRoute;