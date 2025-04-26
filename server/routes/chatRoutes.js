const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { authenticate } = require('../middlewares/authMiddleware');

// Các route không cần xác thực (public)
// Bắt đầu cuộc trò chuyện mới
router.post('/start', chatController.startConversation);

// Gửi tin nhắn và nhận phản hồi
router.post('/message', chatController.sendMessage);

// Lấy lịch sử chat
router.get('/history/:conversationId', chatController.getChatHistory);

// Kết thúc cuộc trò chuyện
router.post('/end', chatController.endConversation);

// Đánh giá cuộc trò chuyện
router.post('/rate', chatController.rateConversation);

// Các route yêu cầu xác thực (dành cho admin và nhân viên)
// Lấy danh sách cuộc trò chuyện (cần xác thực)
router.get('/conversations', authenticate, (req, res) => {
  res.status(501).json({ message: 'API chưa được triển khai' });
});

// Lấy thống kê chat (cần xác thực)
router.get('/statistics', authenticate, (req, res) => {
  res.status(501).json({ message: 'API chưa được triển khai' });
});

module.exports = router; 