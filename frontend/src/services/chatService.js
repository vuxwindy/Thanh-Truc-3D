import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Khởi tạo conversation với chatbot
const startConversation = async () => {
  try {
    const response = await axios.post(`${API_URL}/chat/start`, {});
    return response.data;
  } catch (error) {
    console.error('Error starting conversation:', error);
    throw error;
  }
};

// Gửi tin nhắn đến chatbot và nhận phản hồi
const sendMessage = async (message, conversationId = null) => {
  try {
    const response = await axios.post(`${API_URL}/chat/message`, {
      message,
      conversationId
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Lấy lịch sử chat của một conversation
const getChatHistory = async (conversationId) => {
  try {
    const response = await axios.get(`${API_URL}/chat/history/${conversationId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    throw error;
  }
};

// Đánh giá cuộc trò chuyện
const rateConversation = async (conversationId, rating, feedback = '') => {
  try {
    const response = await axios.post(`${API_URL}/chat/rate`, {
      conversationId,
      rating,
      feedback
    });
    return response.data;
  } catch (error) {
    console.error('Error rating conversation:', error);
    throw error;
  }
};

// Kết thúc cuộc trò chuyện
const endConversation = async (conversationId) => {
  try {
    const response = await axios.post(`${API_URL}/chat/end`, {
      conversationId
    });
    return response.data;
  } catch (error) {
    console.error('Error ending conversation:', error);
    throw error;
  }
};

const chatService = {
  startConversation,
  sendMessage,
  getChatHistory,
  rateConversation,
  endConversation
};

export default chatService; 