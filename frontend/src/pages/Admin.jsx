import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';
import { isAdminSession } from '../utils/session';
import Products from './admin/Products';
import Orders from './admin/Orders';
import Settings from './admin/Settings';
import Dashboard from './admin/Dashboard';
import Banners from './admin/Banners'; // Add this import
import Posts from './admin/Posts';
import Users from './admin/users';
import AdminProfile from './admin/AdminProfile'; // Import the new AdminProfile component

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is admin, if not redirect to login
    if (!isAdminSession()) {
      navigate('/admin/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  return (
    <>
      <Routes>
        <Route path="dashboard" element={<Dashboard user={user}></Dashboard>} />
        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />
        <Route path="banners" element={<Banners />} /> {/* Add this route */}
        <Route path="posts" element={<Posts />} />
        <Route path="orders" element={<Orders />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<AdminProfile />} />
      </Routes>
    </>
  );
};

export default Admin;