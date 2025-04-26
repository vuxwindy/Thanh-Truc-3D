const conversationRepository = require('../repositories/conversationRepository');
const messageRepository = require('../repositories/messageRepository');
const { v4: uuidv4 } = require('uuid');

class ChatService {
  // Bắt đầu một cuộc trò chuyện mới
  async startConversation(userId = null, sessionId = null) {
    try {
      // Nếu có sessionId nhưng không có conversationId, tìm conversation cũ
      if (sessionId) {
        const existingConversation = await conversationRepository.findConversationBySessionId(sessionId);
        if (existingConversation) {
          return {
            conversationId: existingConversation.id,
            isNew: false
          };
        }
      }
      
      // Tạo session ID mới nếu chưa có
      if (!sessionId) {
        sessionId = uuidv4();
      }
      
      // Tạo cuộc trò chuyện mới
      const conversation = await conversationRepository.createConversation(userId, sessionId);
      
      // Tạo tin nhắn chào mừng
      await messageRepository.createMessage(
        conversation.id,
        'Xin chào! Tôi có thể giúp gì cho bạn?',
        'bot'
      );
      
      return {
        conversationId: conversation.id,
        sessionId,
        isNew: true
      };
    } catch (error) {
      console.error('Error starting conversation:', error);
      throw error;
    }
  }
  
  // Gửi tin nhắn và nhận phản hồi
  async sendMessage(message, conversationId = null, userId = null, sessionId = null) {
    try {
      let conversation;
      
      // Nếu không có conversationId, tạo cuộc trò chuyện mới
      if (!conversationId) {
        const result = await this.startConversation(userId, sessionId);
        conversationId = result.conversationId;
        sessionId = result.sessionId;
      }
      
      // Kiểm tra xem cuộc trò chuyện có tồn tại không
      conversation = await conversationRepository.findConversationById(conversationId);
      if (!conversation) {
        throw new Error('Conversation not found');
      }
      
      if (conversation.status === 'ended') {
        throw new Error('This conversation has ended');
      }
      
      // Lưu tin nhắn của người dùng
      const userMessage = await messageRepository.createMessage(
        conversationId,
        message,
        'user'
      );
      
      // Xử lý logic trả lời tin nhắn
      // Đây là nơi bạn có thể tích hợp với các hệ thống AI, chatbot hoặc chuyển hướng đến agent thực
      
      // Mẫu phản hồi (có thể thay thế bằng dịch vụ chatbot thực)
      let botResponse = 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể!';
      
      // Logic phản hồi đơn giản
      if (message.toLowerCase().includes('xin chào') || message.toLowerCase().includes('hello')) {
        botResponse = 'Xin chào! Tôi có thể giúp gì cho bạn?';
      } else if (message.toLowerCase().includes('giờ làm việc') || message.toLowerCase().includes('thời gian làm việc')) {
        botResponse = 'Chúng tôi làm việc từ 8h đến 17h30 từ thứ Hai đến thứ Sáu và 8h đến 12h vào thứ Bảy.';
      } else if (message.toLowerCase().includes('liên hệ') || message.toLowerCase().includes('số điện thoại')) {
        botResponse = 'Bạn có thể liên hệ với chúng tôi qua số điện thoại: 1900 1234 hoặc email: support@example.com';
      } else if (message.toLowerCase().includes('sản phẩm') || message.toLowerCase().includes('mua hàng')) {
        botResponse = 'Bạn có thể xem các sản phẩm của chúng tôi tại trang chủ. Chúng tôi có nhiều mặt hàng đa dạng và chính sách đổi trả trong vòng 30 ngày.';
      } else if (message.toLowerCase().includes('cảm ơn')) {
        botResponse = 'Không có gì! Chúng tôi luôn sẵn sàng hỗ trợ bạn.';
      }
      
      // Lưu phản hồi của bot
      const botMessageObj = await messageRepository.createMessage(
        conversationId,
        botResponse,
        'bot'
      );
      
      return {
        conversationId: conversationId,
        message: botResponse,
        timestamp: botMessageObj.createdAt
      };
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
  
  // Lấy lịch sử chat
  async getChatHistory(conversationId) {
    try {
      const conversation = await conversationRepository.findConversationById(conversationId);
      
      if (!conversation) {
        throw new Error('Conversation not found');
      }
      
      const messages = await messageRepository.findMessagesByConversationId(conversationId);
      
      return {
        conversationId,
        messages: messages.rows.map(message => ({
          id: message.id,
          content: message.content,
          sender: message.sender,
          timestamp: message.createdAt
        }))
      };
    } catch (error) {
      console.error('Error getting chat history:', error);
      throw error;
    }
  }
  
  // Kết thúc cuộc trò chuyện
  async endConversation(conversationId) {
    try {
      const conversation = await conversationRepository.findConversationById(conversationId);
      
      if (!conversation) {
        throw new Error('Conversation not found');
      }
      
      await conversationRepository.updateConversationStatus(conversationId, 'ended');
      
      return {
        conversationId,
        status: 'ended'
      };
    } catch (error) {
      console.error('Error ending conversation:', error);
      throw error;
    }
  }
  
  // Đánh giá cuộc trò chuyện
  async rateConversation(conversationId, rating, feedback = '') {
    try {
      const conversation = await conversationRepository.findConversationById(conversationId);
      
      if (!conversation) {
        throw new Error('Conversation not found');
      }
      
      await conversationRepository.updateConversationRating(conversationId, rating, feedback);
      
      return {
        conversationId,
        rating,
        feedback
      };
    } catch (error) {
      console.error('Error rating conversation:', error);
      throw error;
    }
  }
}

module.exports = new ChatService(); 