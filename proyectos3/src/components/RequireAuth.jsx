// RequireAuth.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const RequireAuth = ({ children }) => {
  const user = Cookies.get('user');

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RequireAuth;
