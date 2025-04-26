const { createOrderFromCart, getUserOrders, getOrderById, updateOrderStatus, generateLicencesForOrder, sendOrderLicenseEmail,getAdminOrdersService } = require('../services/order.service');

// Create order from cart
const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { paymentMethod } = req.body;
    
    const result = await createOrderFromCart(userId, paymentMethod || 1);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get user orders
const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await getUserOrders(userId);
    res.json(orders);
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get order by ID
const getOrderByIdController = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.id;
    
    const order = await getOrderById(userId, orderId);
    res.json(order);
  } catch (error) {
    console.error('Error getting order:', error);
    if (error.message === 'Order not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

// Update order status
const updateOrderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status, transactionId } = req.body;
    const userId = req.user.id;

    const updatedOrder = await updateOrderStatus(orderId, status, transactionId, userId);
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    if (error.message === 'Order not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

// Generate licences for order
const generateLicences = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.id;
    
    // First, check if the order belongs to the user
    const order = await getOrderById(userId, orderId);
    
    // Generate licences for all products in the order
    const licences = await generateLicencesForOrder(orderId);
    
    res.json({
      message: 'Licences generated successfully',
      licences
    });
  } catch (error) {
    console.error('Error generating licences:', error);
    if (error.message === 'Order not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

// Send license email for order
const sendLicenseEmailForOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.id;
    
    // First check if the order belongs to the user
    const order = await getOrderById(userId, orderId);
    
    // Send license email
    await sendOrderLicenseEmail(orderId);
    
    res.json({
      success: true,
      message: 'License email sent successfully'
    });
  } catch (error) {
    console.error('Error sending license email:', error);
    if (error.message === 'Order not found') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === 'User not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

// Get admin orders
const getAdminOrders = async (req, res) => {
  try {
    const { status, page, limit, search } = req.query;
    
    const order = await getAdminOrdersService(status, page, limit, search);
    res.json(order);
  } catch (error) {
    console.error('Error getting order:', error);
    if (error.message === 'Order not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

// Export the functions
module.exports = {
  createOrder,
  getOrders,
  getOrderById: getOrderByIdController,
  updateOrderStatus: updateOrderStatusController,
  generateLicences,
  sendLicenseEmailForOrder,
  getAdminOrders
};