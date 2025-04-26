const db = require('../models');
const { Op } = require('sequelize');
const { clearUserCart } = require('./cart.service');
const { sendProductLicensesEmail } = require('../config/email');

// Create a new order from cart items
const createOrderFromCart = async (userId, paymentMethod = 1) => {
  // Start a transaction
  const transaction = await db.sequelize.transaction();

  try {
    // Get cart items
    const cartItems = await db.CartItem.findAll({
      where: { user_id: userId },
      include: [
        {
          model: db.Product,
          as: 'product',
          attributes: ['id', 'name', 'priceSale']
        }
      ],
      transaction
    });

    if (cartItems.length === 0) {
      throw new Error('Cart is empty');
    }

    // Calculate total price
    const totalPrice = cartItems.reduce((sum, item) => {
      return sum + (parseFloat(item.product.priceSale) * item.quantity);
    }, 0);

    // Create order
    const order = await db.Order.create({
      cid: userId,
      payment_method: paymentMethod,
      price: totalPrice,
      status: 'pending'
    }, { transaction });

    // Create order products
    const orderProducts = [];
    for (const item of cartItems) {
      await db.OrderProduct.create({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product.priceSale,
        licence: null
      }, { transaction });

      orderProducts.push({
        productId: item.product_id,
        quantity: item.quantity,
        price: item.product.priceSale,
        licence: null
      });
    }

    // Clear the cart
    await clearUserCart(userId, transaction);

    // Commit transaction
    await transaction.commit();

    return {
      order,
      orderProducts
    };
  } catch (error) {
    // Rollback transaction in case of error
    await transaction.rollback();
    throw error;
  }
};

// Get user orders
const getUserOrders = async (userId) => {
  const orders = await db.Order.findAll({
    where: { cid: userId },
    include: [
      {
        model: db.Product,
        as: 'products',
        through: {
          attributes: ['quantity', 'price']
        },
        include: [
          {
            model: db.Category,
            as: 'category',
            attributes: ['id', 'name']
          }
        ]
      }
    ],
    order: [['created_at', 'DESC']]
  });

  return orders;
};

// Get order by ID
const getOrderById = async (userId, orderId) => {
  const order = await db.Order.findOne({
    where: {
      id: orderId,
      cid: userId // Ensure user can only access their own orders
    },
    include: [
      {
        model: db.Product,
        as: 'products',
        through: {
          attributes: ['quantity', 'price']
        },
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

  if (!order) {
    throw new Error('Order not found');
  }

  return order;
};

// Update order status
const updateOrderStatus = async (orderId, status, transactionId, userId) => {
  const order = await db.Order.findOne({
    where: {
      id: orderId,
      cid: userId // Ensure user can only access their own orders
    }
  });

  if (!order) {
    throw new Error('Order not found');
  }

  // Update order status and transaction ID
  await order.update({
    status,
    transaction_id: transactionId || null
  });

  // Generate licences for all products in the order
  await generateLicencesForOrder(orderId);

  // If order is completed, send license email
  if (status === 'completed') {
    await sendOrderLicenseEmail(orderId);
  }

  return order;
};

// Generate and update licence for order product
const generateAndUpdateLicence = async (orderId, productId) => {
  try {
    const orderProduct = await db.OrderProduct.findOne({
      where: {
        order_id: orderId,
        product_id: productId
      }
    });

    if (!orderProduct) {
      throw new Error('Order product not found');
    }

    // Generate a unique licence code (you can customize this according to your needs)
    const licenceCode = `LIC-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    // Update the order product with the licence code
    await orderProduct.update({
      licence: licenceCode
    });

    return licenceCode;
  } catch (error) {
    throw error;
  }
};

// Generate licences for all products in an order
const generateLicencesForOrder = async (orderId) => {
  try {
    const orderProducts = await db.OrderProduct.findAll({
      where: { order_id: orderId }
    });

    const licences = [];

    for (const orderProduct of orderProducts) {
      const licence = await generateAndUpdateLicence(orderProduct.order_id, orderProduct.product_id);
      licences.push({
        productId: orderProduct.product_id,
        licence
      });
    }

    return licences;
  } catch (error) {
    throw error;
  }
};

// Send email with product licenses
const sendOrderLicenseEmail = async (orderId) => {
  try {
    // Get the order with user info
    const order = await db.Order.findOne({
      where: { id: orderId }
    });

    if (!order) {
      throw new Error('Order not found');
    }

    // Get user email
    const user = await db.User.findByPk(order.cid);
    if (!user) {
      throw new Error('User not found');
    }

    // Get all order products with licenses
    const orderProducts = await db.OrderProduct.findAll({
      where: { order_id: orderId }
    });

    if (!orderProducts || orderProducts.length === 0) {
      throw new Error('No products found for this order');
    }

    // Build products array with names and licenses
    const productsWithLicenses = [];

    for (const item of orderProducts) {
      // Get product information
      const product = await db.Product.findByPk(item.product_id);
      if (!product) {
        console.warn(`Product with ID ${item.product_id} not found`);
        continue;
      }

      productsWithLicenses.push({
        name: product.name,
        licence: item.licence
      });
    }

    // Send email if we have products with licenses
    if (productsWithLicenses.length > 0) {
      await sendProductLicensesEmail(user.email, orderId, productsWithLicenses);
      console.log(`License email sent to ${user.email} for order ${orderId}`);
    }

    return true;
  } catch (error) {
    console.error('Error sending license email:', error);
    throw error;
  }
};

const getAdminOrdersService = async (status = null, page = 1, limit = 10, search = null) => {
  try {
    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Get total count for pagination
    const totalCount = await db.Order.count({
      where: status ? {
        status: {
          [Op.eq]: status
        }
      } : {}
    });

    // Get paginated orders
    const orders = await db.Order.findAll({
      where: status ? {
        status: {
          [Op.eq]: status
        }
      } : {},
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: db.User,
          as: 'user',
          attributes: ['id', 'fullName', 'email', 'avatar', 'phone'],
          where: search ? {
            [Op.or]: [
              { fullName: { [Op.like]: `%${search}%` } },
              { email: { [Op.like]: `%${search}%` } },
              { phone: { [Op.like]: `%${search}%` } }
            ]
          } : null
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

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    return {
      orders,
      currentPage: page,
      totalPages,
      totalItems: totalCount,
      itemsPerPage: limit
    };
  }
  catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
}

module.exports = {
  createOrderFromCart,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  generateAndUpdateLicence,
  generateLicencesForOrder,
  sendOrderLicenseEmail,
  getAdminOrdersService
};