const chatService = require('../services/chatService');

class ChatController {
  // Bắt đầu cuộc trò chuyện mới
  async startConversation(req, res) {
    try {
      const userId = req.user ? req.user.id : null;
      const { sessionId } = req.body;
      
      const result = await chatService.startConversation(userId, sessionId);
      
      res.status(200).json({
        success: true,
        conversationId: result.conversationId,
        sessionId: result.sessionId
      });
    } catch (error) {
      console.error('Error starting conversation:', error);
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra khi bắt đầu cuộc trò chuyện',
        error: error.message
      });
    }
  }
  
  // Gửi tin nhắn và nhận phản hồi
  async sendMessage(req, res) {
    try {
      const { message, conversationId, sessionId } = req.body;
      const userId = req.user ? req.user.id : null;
      
      if (!message) {
        return res.status(400).json({
          success: false,
          message: 'Tin nhắn không được để trống'
        });
      }
      
      const result = await chatService.sendMessage(message, conversationId, userId, sessionId);
      
      res.status(200).json({
        success: true,
        conversationId: result.conversationId,
        message: result.message,
        timestamp: result.timestamp
      });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra khi gửi tin nhắn',
        error: error.message
      });
    }
  }
  
  // Lấy lịch sử chat
  async getChatHistory(req, res) {
    try {
      const { conversationId } = req.params;
      
      if (!conversationId) {
        return res.status(400).json({
          success: false,
          message: 'Thiếu conversationId'
        });
      }
      
      const history = await chatService.getChatHistory(conversationId);
      
      res.status(200).json({
        success: true,
        conversationId: history.conversationId,
        messages: history.messages
      });
    } catch (error) {
      console.error('Error getting chat history:', error);
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra khi lấy lịch sử chat',
        error: error.message
      });
    }
  }
  
  // Kết thúc cuộc trò chuyện
  async endConversation(req, res) {
    try {
      const { conversationId } = req.body;
      
      if (!conversationId) {
        return res.status(400).json({
          success: false,
          message: 'Thiếu conversationId'
        });
      }
      
      const result = await chatService.endConversation(conversationId);
      
      res.status(200).json({
        success: true,
        conversationId: result.conversationId,
        status: result.status
      });
    } catch (error) {
      console.error('Error ending conversation:', error);
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra khi kết thúc cuộc trò chuyện',
        error: error.message
      });
    }
  }
  
  // Đánh giá cuộc trò chuyện
  async rateConversation(req, res) {
    try {
      const { conversationId, rating, feedback } = req.body;
      
      if (!conversationId || !rating) {
        return res.status(400).json({
          success: false,
          message: 'Thiếu conversationId hoặc rating'
        });
      }
      
      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          success: false,
          message: 'Rating phải có giá trị từ 1 đến 5'
        });
      }
      
      const result = await chatService.rateConversation(conversationId, rating, feedback);
      
      res.status(200).json({
        success: true,
        conversationId: result.conversationId,
        rating: result.rating,
        feedback: result.feedback
      });
    } catch (error) {
      console.error('Error rating conversation:', error);
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra khi đánh giá cuộc trò chuyện',
        error: error.message
      });
    }
  }
}

module.exports = new ChatController(); 