import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../LoginAuth/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/SignIn" />;
};

export default ProtectedRoute;
