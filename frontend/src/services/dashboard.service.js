import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Get dashboard statistics
export const getDashboardStats = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/dashboard/stats`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Get revenue data for charts
export const getRevenueData = async (period = 'month') => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/dashboard/revenue?period=${period}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Get user registration data for charts
export const getUserRegistrationData = async (period = 'month') => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/dashboard/users?period=${period}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Get order data for charts
export const getOrderData = async (period = 'month') => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/dashboard/orders?period=${period}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};