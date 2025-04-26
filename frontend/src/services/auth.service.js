import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return {
    success: true,
    data: {
      user: {
        ...response.data.user,
        roles: response.data.user.roles || []
      },
      token: response.data.token
    }
  };
};

export const verifyRegistration = async (email, code, userData) => {
  const response = await axios.post(`${API_URL}/auth/verify`, {
    email,
    code,
    ...userData,
  });
  return {
    success: true,
    data: {
      user: {
        ...response.data.user,
        roles: response.data.user.roles || []
      },
      token: response.data.token
    }
  };
};

// Admin login function
export const adminLogin = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/admin/login`, credentials);
  return {
    success: true,
    data: {
      user: response.data.user,
      token: response.data.token
    }
  };
};

// New functions for forgot password
export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
  return response.data;
};

export const resetPassword = async (email, code, newPassword) => {
  const response = await axios.post(`${API_URL}/auth/reset-password`, {
    email,
    code,
    newPassword
  });
  return response.data;
};