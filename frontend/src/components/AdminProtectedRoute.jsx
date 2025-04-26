import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAccessToken, isAdminSession } from '../utils/session';
import { useSelector } from 'react-redux';

const AdminProtectedRoute = () => {
  const isAuthenticated = getAccessToken();
  
  // Check if user is authenticated and has admin role
  const isAdmin = isAdminSession();

  if (!isAuthenticated) {
    // If not authenticated, redirect to login
    return <Navigate to="/admin/login" replace />;
  }
  
  if (!isAdmin) {
    // If authenticated but not admin, redirect to regular dashboard
    return <Navigate to="/customer/dashboard" replace />;
  }

  // If admin, render the child routes
  return <Outlet />;
};

export default AdminProtectedRoute;