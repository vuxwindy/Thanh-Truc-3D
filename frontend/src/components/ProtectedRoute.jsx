import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {getAccessToken, isAdminSession} from "../utils/session.js";

const ProtectedRoute = () => {
  const isAuthenticated = getAccessToken()
  if (!isAuthenticated) {
    return <Navigate to="/customer/login" replace />;
  }
  const isAdmin = isAdminSession();
  if (isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute; 
