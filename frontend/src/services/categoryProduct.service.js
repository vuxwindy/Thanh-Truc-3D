import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Get category details
export const getCategoryById = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
};

// Get products by category with search and pagination
export const getProductsByCategory = async (categoryId, search = '', page = 1, limit = 8) => {
  try {
    const response = await axios.get(`${API_URL}/products`, {
      params: {
        category_id: categoryId,
        search,
        page,
        limit
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get product details by ID
export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};