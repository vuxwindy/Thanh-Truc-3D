import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const getProductsByCategories = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/products/by-categories`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Get all products with pagination and search
export const getProducts = async (page = 1, limit = 10, search = '') => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/products`, {
    params: { page, limit, search },
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Get product by ID
export const getProductById = async (productId) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Create new product
export const createProduct = async (productData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/products`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Update product
export const updateProduct = async (productId, productData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/products/${productId}`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Delete product
export const deleteProduct = async (productId) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};