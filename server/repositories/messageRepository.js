const { Message, sequelize } = require('../models');
const { Op } = require('sequelize');

class MessageRepository {
  // Tạo tin nhắn mới
  async createMessage(conversationId, content, sender) {
    return await Message.create({
      conversationId,
      content,
      sender
    });
  }
  
  // Lấy tin nhắn theo ID
  async findMessageById(id) {
    return await Message.findByPk(id);
  }
  
  // Lấy tất cả tin nhắn của một cuộc trò chuyện
  async findMessagesByConversationId(conversationId, limit = 100, offset = 0) {
    return await Message.findAndCountAll({
      where: { conversationId },
      order: [['createdAt', 'ASC']],
      limit,
      offset
    });
  }
  
  // Lấy tin nhắn mới nhất của cuộc trò chuyện
  async findLatestMessageByConversationId(conversationId) {
    return await Message.findOne({
      where: { conversationId },
      order: [['createdAt', 'DESC']]
    });
  }
  
  // Lấy tất cả tin nhắn với phân trang
  async findAllMessages(limit = 100, offset = 0) {
    return await Message.findAndCountAll({
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });
  }
  
  // Tìm kiếm tin nhắn theo nội dung
  async searchMessages(keyword, limit = 100, offset = 0) {
    return await Message.findAndCountAll({
      where: {
        content: {
          [Op.like]: `%${keyword}%`
        }
      },
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });
  }
}

module.exports = new MessageRepository(); 