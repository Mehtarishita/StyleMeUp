import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login.html" replace />;
  }

  if (user.role !== 'admin') {
    toast.error('Access Denied. Admins only.');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
