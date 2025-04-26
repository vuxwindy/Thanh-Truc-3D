import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getBlogs = async (page = 1, limit = 10, search = '') => {
  try {
    const response = await axios.get(`${API_URL}/posts`, {
      params: { page, limit, search }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 