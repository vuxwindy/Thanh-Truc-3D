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

export const verifyRegistration = async (email, code, userData = {}, files = {}) => {
  // If files provided or File objects included in userData, send multipart/form-data
  const hasFiles = files.idFront || files.idBack || userData.idFront instanceof File || userData.idBack instanceof File;

  if (hasFiles) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('code', code);

    // append fields
    Object.keys(userData).forEach((key) => {
      const val = userData[key];
      if (val !== undefined && val !== null && !(val instanceof File)) {
        formData.append(key, val);
      }
    });

    if (files.idFront) formData.append('idFront', files.idFront);
    if (files.idBack) formData.append('idBack', files.idBack);
    if (userData.idFront instanceof File) formData.append('idFront', userData.idFront);
    if (userData.idBack instanceof File) formData.append('idBack', userData.idBack);

    const response = await axios.post(`${API_URL}/auth/verify`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return {
      success: true,
      data: {
        user: response.data.user || null,
        token: response.data.token || null,
        message: response.data.message || null
      }
    };
  }

  const response = await axios.post(`${API_URL}/auth/verify`, {
    email,
    code,
    ...userData,
  });
  return {
    success: true,
    data: {
      user: response.data.user || null,
      token: response.data.token || null,
      message: response.data.message || null
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