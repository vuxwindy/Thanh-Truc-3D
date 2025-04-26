const express = require('express');
const router = express.Router();
const { authMiddleware, adminAuthMiddleware } = require('../middlewares/auth.middleware');
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  generateLicences,
  sendLicenseEmailForOrder,
  getAdminOrders,
} = require('../controllers/order.controller');

// Create order
router.post('/', authMiddleware, createOrder);

// Get user orders
router.get('/', authMiddleware, getOrders);

// Get admin orders - moved this route before the /:id route
router.get('/order-admin', adminAuthMiddleware, getAdminOrders);

// Get order by ID
router.get('/:id', authMiddleware, getOrderById);

// Update order status
router.patch('/:id/status', authMiddleware, updateOrderStatus);

// Generate licences for order
router.post('/:id/licences', authMiddleware, generateLicences);

// Send license email for order
router.post('/:id/send-license-email', authMiddleware, sendLicenseEmailForOrder);

module.exports = router;