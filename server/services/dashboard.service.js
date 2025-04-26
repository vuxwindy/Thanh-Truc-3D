const db = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

// Get dashboard statistics
const getDashboardStats = async () => {
  try {
    // Get total users (customers only) - Modified to handle potential association issues
    let totalUsers = 0;
    try {
      // Check if Role model exists
      if (!db.Role) {
        console.error('Role model not found');
        totalUsers = await db.User.count();
      } else {
        // Try with association
        totalUsers = await db.User.count({
          include: [
            {
              model: db.Role,
              as: 'roles',
              where: { name: 'customer' },
              through: { attributes: [] },
              required: true
            }
          ]
        });
      }
    } catch (userErr) {
      console.error('Error counting users with roles:', userErr);
      // Fallback to simple count
      totalUsers = await db.User.count();
    }
    
    // Get total products with error handling
    let totalProducts = 0;
    try {
      totalProducts = await db.Product.count();
    } catch (productErr) {
      console.error('Error counting products:', productErr);
    }

    // Get total orders with error handling
    let totalOrders = 0;
    try {
      totalOrders = await db.Order.count();
    } catch (orderErr) {
      console.error('Error counting orders:', orderErr);
    }

    // Get recent orders with error handling
    let recentOrders = [];
    try {
      recentOrders = await db.Order.findAll({
        limit: 5,
        order: [['created_at', 'DESC']],
        include: [
          {
            model: db.User,
            as: 'user',
            attributes: ['id', 'fullName', 'email','phone'],
            required: false
          },
          {
            model: db.Product,
            as: 'products',
            through: {
              attributes: ['quantity', 'price', 'licence'] // Removed 'image' and 'name'
            },
            attributes: ['id', 'name', 'image'], // Added these attributes to the Product model instead
            include: [
              {
                model: db.Category,
                as: 'category',
                attributes: ['id', 'name']
              }
            ]
          }
        ]
      });
    } catch (recentOrdersErr) {
      console.error('Error fetching recent orders:', recentOrdersErr);
    }

    return {
      totalUsers,
      totalProducts,
      totalOrders,
      recentOrders
    };
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    throw error;
  }
};

// Helper function to generate date ranges and labels
const generateDateRanges = (period) => {
  const now = moment();
  let startDate, endDate, format, dateFormat;
  const ranges = [];
  const labels = [];

  switch (period) {
    case 'day':
      startDate = moment().subtract(30, 'days').startOf('day');
      endDate = moment().endOf('day');
      format = 'YYYY-MM-DD';
      dateFormat = 'MMM D';
      break;
    case 'month':
      startDate = moment().subtract(12, 'months').startOf('month');
      endDate = moment().endOf('month');
      format = 'YYYY-MM';
      dateFormat = 'MMM YYYY';
      break;
    case 'year':
      startDate = moment().subtract(5, 'years').startOf('year');
      endDate = moment().endOf('year');
      format = 'YYYY';
      dateFormat = 'YYYY';
      break;
    default:
      startDate = moment().subtract(12, 'months').startOf('month');
      endDate = moment().endOf('month');
      format = 'YYYY-MM';
      dateFormat = 'MMM YYYY';
  }

  let current = startDate.clone();

  while (current.isSameOrBefore(endDate)) {
    const periodStart = current.clone();
    
    if (period === 'day') {
      const periodEnd = current.clone().endOf('day');
      ranges.push({ start: periodStart.toDate(), end: periodEnd.toDate() });
      labels.push(periodStart.format(dateFormat));
      current.add(1, 'days');
    } else if (period === 'month') {
      const periodEnd = current.clone().endOf('month');
      ranges.push({ start: periodStart.toDate(), end: periodEnd.toDate() });
      labels.push(periodStart.format(dateFormat));
      current.add(1, 'months');
    } else if (period === 'year') {
      const periodEnd = current.clone().endOf('year');
      ranges.push({ start: periodStart.toDate(), end: periodEnd.toDate() });
      labels.push(periodStart.format(dateFormat));
      current.add(1, 'years');
    }
  }

  return { ranges, labels };
};

// Get revenue data for charts
const getRevenueData = async (period = 'month') => {
  try {
    const { ranges, labels } = generateDateRanges(period);
    const values = [];

    for (const range of ranges) {
      const totalRevenue = await db.Order.sum('price', {
        where: {
          created_at: {
            [Op.between]: [range.start, range.end]
          },
          status: 'completed'
        }
      });

      values.push(totalRevenue || 0);
    }

    return { labels, values };
  } catch (error) {
    console.error('Error getting revenue data:', error);
    throw error;
  }
};

// Get user registration data for charts
const getUserRegistrationData = async (period = 'month') => {
  try {
    const { ranges, labels } = generateDateRanges(period);
    const values = [];

    for (const range of ranges) {
      let userCount = 0;
      try {
        // Check if Role model exists
        if (!db.Role) {
          // Fallback to simple count without role filtering
          userCount = await db.User.count({
            where: {
              created_at: {
                [Op.between]: [range.start, range.end]
              }
            }
          });
        } else {
          // Try with association
          userCount = await db.User.count({
            where: {
              created_at: {
                [Op.between]: [range.start, range.end]
              }
            },
            include: [
              {
                model: db.Role,
                as: 'roles',
                where: { name: 'customer' },
                through: { attributes: [] },
                required: true
              }
            ]
          });
        }
      } catch (err) {
        console.error(`Error counting users for period ${range.start} to ${range.end}:`, err);
        // Fallback to simple count without role filtering
        userCount = await db.User.count({
          where: {
            created_at: {
              [Op.between]: [range.start, range.end]
            }
          }
        });
      }

      values.push(userCount || 0);
    }

    return { labels, values };
  } catch (error) {
    console.error('Error getting user registration data:', error);
    throw error;
  }
};

// Get order data for charts
const getOrderData = async (period = 'month') => {
  try {
    const { ranges, labels } = generateDateRanges(period);
    const values = [];

    for (const range of ranges) {
      const orderCount = await db.Order.count({
        where: {
          created_at: {
            [Op.between]: [range.start, range.end]
          }
        }
      });

      values.push(orderCount || 0);
    }

    return { labels, values };
  } catch (error) {
    console.error('Error getting order data:', error);
    throw error;
  }
};

// Add this function to your existing dashboard.service.js file

// Export revenue data to Excel
const exportRevenueData = async (period = 'month') => {
  try {
    const { ranges, labels } = generateDateRanges(period);
    const values = [];

    for (const range of ranges) {
      const totalRevenue = await db.Order.sum('price', {
        where: {
          created_at: {
            [Op.between]: [range.start, range.end]
          },
          status: 'completed'
        }
      });

      values.push(totalRevenue || 0);
    }

    return { 
      labels, 
      values,
      periodType: period,
      generatedAt: new Date()
    };
  } catch (error) {
    console.error('Error exporting revenue data:', error);
    throw error;
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