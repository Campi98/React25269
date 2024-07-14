import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../LoginAuth/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/SignIn" />;
  }

  if (!isAdmin) {
    return <div>Access Denied</div>;
  }

  return children;
};

export default AdminRoute;
