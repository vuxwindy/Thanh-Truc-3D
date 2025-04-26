const { Conversation, Message, sequelize } = require('../models');
const { Op } = require('sequelize');

class ConversationRepository {
  // Tạo cuộc trò chuyện mới
  async createConversation(userId = null, sessionId = null) {
    return await Conversation.create({
      userId,
      sessionId,
      status: 'active'
    });
  }
  
  // Tìm cuộc trò chuyện theo ID
  async findConversationById(id) {
    return await Conversation.findByPk(id, {
      include: [
        {
          model: Message,
          as: 'messages',
          order: [['createdAt', 'ASC']]
        }
      ]
    });
  }
  
  // Cập nhật trạng thái cuộc trò chuyện
  async updateConversationStatus(id, status) {
    return await Conversation.update(
      { status },
      { where: { id } }
    );
  }
  
  // Cập nhật đánh giá cuộc trò chuyện
  async updateConversationRating(id, rating, feedback = null) {
    return await Conversation.update(
      { rating, feedback },
      { where: { id } }
    );
  }
  
  // Lấy cuộc trò chuyện theo userId
  async findConversationsByUserId(userId, limit = 10, offset = 0) {
    return await Conversation.findAndCountAll({
      where: { userId },
      include: [
        {
          model: Message,
          as: 'messages',
          limit: 1,
          order: [['createdAt', 'DESC']]
        }
      ],
      order: [['updatedAt', 'DESC']],
      limit,
      offset
    });
  }
  
  // Lấy cuộc trò chuyện theo sessionId
  async findConversationBySessionId(sessionId) {
    return await Conversation.findOne({
      where: { 
        sessionId,
        status: 'active'
      }
    });
  }
  
  // Lấy tất cả cuộc trò chuyện
  async findAllConversations(status = null, limit = 10, offset = 0) {
    const whereClause = status ? { status } : {};
    
    return await Conversation.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Message,
          as: 'messages',
          limit: 1,
          order: [['createdAt', 'DESC']]
        }
      ],
      order: [['updatedAt', 'DESC']],
      limit,
      offset
    });
  }
}

module.exports = new ConversationRepository(); 