import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Get all categories
export const getCategories = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/categories`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Additional category-related API calls can be added here