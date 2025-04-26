import React, { createContext, useState, useContext, useEffect } from 'react';
import chatService from '../services/chatService';
import geminiService from '../services/geminiService';

const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Khởi tạo cuộc trò chuyện mới khi chat được mở
  const startNewConversation = async () => {
    if (conversationId) return;
    
    try {
      setIsLoading(true);
      const response = await chatService.startConversation();
      setConversationId(response.conversationId);
      
      // Khởi tạo với tin nhắn chào mừng
      setMessages([
        { id: 1, text: 'Xin chào! Tôi là trợ lý AI của Web2D. Tôi có thể giúp gì cho bạn?', sender: 'bot' }
      ]);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to start conversation:', error);
      setIsLoading(false);
    }
  };
  
  // Gửi tin nhắn đến chatbot powered by Gemini
  const sendMessage = async (message) => {
    if (!message.trim() || isLoading) return;
    
    // Thêm tin nhắn người dùng vào danh sách
    const userMessage = { id: Date.now(), text: message, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Tạo cuộc trò chuyện mới nếu chưa có
      if (!conversationId) {
        await startNewConversation();
      }
      
      // Sử dụng Gemini để tạo phản hồi
      const geminiResponse = await geminiService.generateResponse(message);
      
      // Lưu tin nhắn vào lịch sử nếu cần
      try {
        await chatService.sendMessage(message, conversationId);
      } catch (error) {
        console.warn('Failed to save message to history, but continuing with Gemini response', error);
      }
      
      // Thêm tin nhắn phản hồi vào danh sách
      const botResponse = {
        id: Date.now() + 1,
        text: geminiResponse || 'Xin lỗi, tôi không thể xử lý yêu cầu của bạn lúc này.',
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Thêm tin nhắn lỗi
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: 'Xin lỗi, có lỗi xảy ra khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.',
        sender: 'bot'
      }]);
      
      setIsLoading(false);
    }
  };
  
  // Kết thúc cuộc trò chuyện
  const endConversation = async () => {
    if (!conversationId) return;
    
    try {
      await chatService.endConversation(conversationId);
      setConversationId(null);
      setMessages([
        { id: Date.now(), text: 'Xin chào! Tôi là trợ lý AI của Web2D. Tôi có thể giúp gì cho bạn?', sender: 'bot' }
      ]);
    } catch (error) {
      console.error('Error ending conversation:', error);
    }
  };
  
  // Đánh giá cuộc trò chuyện
  const rateConversation = async (rating, feedback = '') => {
    if (!conversationId) return;
    
    try {
      await chatService.rateConversation(conversationId, rating, feedback);
    } catch (error) {
      console.error('Error rating conversation:', error);
    }
  };
  
  // Lấy lịch sử tin nhắn khi có conversationId
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!conversationId) return;
      
      try {
        setIsLoading(true);
        const history = await chatService.getChatHistory(conversationId);
        
        if (history && history.messages) {
          setMessages(history.messages.map((msg, index) => ({
            id: index + 1,
            text: msg.content,
            sender: msg.sender
          })));
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching chat history:', error);
        setIsLoading(false);
      }
    };
    
    // Chỉ lấy lịch sử khi có conversationId và không có tin nhắn
    if (conversationId && messages.length <= 1) {
      fetchChatHistory();
    }
  }, [conversationId]);
  
  // Mở chat và khởi tạo cuộc trò chuyện
  useEffect(() => {
    if (isOpen && !conversationId) {
      startNewConversation();
    }
  }, [isOpen]);
  
  return (
    <ChatContext.Provider
      value={{
        conversationId,
        messages,
        isOpen,
        isLoading,
        setIsOpen,
        sendMessage,
        endConversation,
        rateConversation
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext; 