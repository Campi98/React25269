import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  const authRoutes = ['/SignIn', '/SignUp'];

  if (isAuthenticated && authRoutes.includes(location.pathname)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;
