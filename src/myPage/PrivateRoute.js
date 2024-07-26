import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuthContext } from '../Auth/UserAuthContext.jsx';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isInitialized } = useContext(UserAuthContext);

  if (!isInitialized) {
    return <div></div>;
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
