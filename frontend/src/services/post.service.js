import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Get all posts with pagination and search
export const getPosts = async (page = 1, limit = 10, search = '') => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/posts?page=${page}&limit=${limit}&search=${search}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Get post by ID
export const getPostById = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Create new post
export const createPost = async (postData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/posts`, postData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

// Update post
export const updatePost = async (id, postData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/posts/${id}`, postData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

// Delete post
export const deletePost = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};