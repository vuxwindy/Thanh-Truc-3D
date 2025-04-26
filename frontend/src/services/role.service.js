import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Get all roles
export const getAllRoles = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/roles`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Assign roles to user
export const assignRolesToUser = async (userId, roleIds) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/roles/assign`, {
    userId,
    roleIds
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};