import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Send a prompt to the Gemini API and get a response
 * @param {string} prompt - The text prompt to send to Gemini
 * @returns {Promise<string>} - The generated response from Gemini
 */
const generateResponse = async (prompt) => {
  try {
    const response = await axios.post(`${API_URL}/gemini/generate`, {
      prompt
    });
    
    if (response.data && response.data.success) {
      return response.data.response;
    } else {
      throw new Error(response.data?.message || 'No response from Gemini API');
    }
  } catch (error) {
    console.error('Error generating response from Gemini:', error);
    throw error;
  }
};

const geminiService = {
  generateResponse
};

export default geminiService; 