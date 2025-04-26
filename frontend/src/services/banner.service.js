import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Get all banners with pagination
export const getBanners = async (page = 1, limit = 10) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/banners?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Get banner by ID
export const getBannerById = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/banners/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Create new banner
export const createBanner = async (bannerData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/banners`, bannerData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Update banner
export const updateBanner = async (id, bannerData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/banners/${id}`, bannerData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Delete banner
export const deleteBanner = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/banners/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};