const express = require('express');
const router = express.Router();
const { adminAuthMiddleware } = require('../middlewares/auth.middleware');

// Add this route to your existing dashboard.routes.js

// Make sure to update the imports at the top of the file
const {
  getDashboardStats,
  getRevenueData,
  getUserRegistrationData,
  getOrderData,
  exportRevenueData
} = require('../controllers/dashboard.controller');

// Get dashboard statistics
router.get('/stats', adminAuthMiddleware, getDashboardStats);

// Get revenue data for charts
router.get('/revenue', adminAuthMiddleware, getRevenueData);

// Get user registration data for charts
router.get('/users', adminAuthMiddleware, getUserRegistrationData);

// Get order data for charts
router.get('/orders', adminAuthMiddleware, getOrderData);

// Export revenue data
router.get('/export/revenue', adminAuthMiddleware, exportRevenueData);

module.exports = router;