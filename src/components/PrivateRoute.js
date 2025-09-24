import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check for the token in localStorage
  const isAuthenticated = localStorage.getItem('token');

  // If the user is authenticated, render the page they want to see.
  // If not, redirect them to the admin login page.
  return isAuthenticated ? children : <Navigate to="/admin" />;
};

export default PrivateRoute;
