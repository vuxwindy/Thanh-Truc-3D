const dashboardService = require('../services/dashboard.service');

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const stats = await dashboardService.getDashboardStats();
    res.json(stats);
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    res.status(500).json({ error: 'Failed to get dashboard statistics' });
  }
};

// Get revenue data for charts
const getRevenueData = async (req, res) => {
  try {
    const { period } = req.query;
    const data = await dashboardService.getRevenueData(period);
    res.json(data);
  } catch (error) {
    console.error('Error getting revenue data:', error);
    res.status(500).json({ error: 'Failed to get revenue data' });
  }
};

// Get user registration data for charts
const getUserRegistrationData = async (req, res) => {
  try {
    const { period } = req.query;
    const data = await dashboardService.getUserRegistrationData(period);
    res.json(data);
  } catch (error) {
    console.error('Error getting user registration data:', error);
    res.status(500).json({ error: 'Failed to get user registration data' });
  }
};

// Get order data for charts
const getOrderData = async (req, res) => {
  try {
    const { period } = req.query;
    const data = await dashboardService.getOrderData(period);
    res.json(data);
  } catch (error) {
    console.error('Error getting order data:', error);
    res.status(500).json({ error: 'Failed to get order data' });
  }
};

// Add this function to your existing dashboard.controller.js

// Export revenue data
const exportRevenueData = async (req, res) => {
  try {
    const { period } = req.query;
    const data = await dashboardService.exportRevenueData(period);
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=revenue_${period}_${new Date().toISOString().split('T')[0]}.json`);
    res.json(data);
  } catch (error) {
    console.error('Error exporting revenue data:', error);
    res.status(500).json({ error: 'Failed to export revenue data' });
  }
};

// Add this to your module.exports
module.exports = {
  getDashboardStats,
  getRevenueData,
  getUserRegistrationData,
  getOrderData,
  exportRevenueData
};