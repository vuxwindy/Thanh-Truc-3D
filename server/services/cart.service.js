const db = require('../models');
const { Op } = require('sequelize');

// Get cart items for a user
const getCartItems = async (userId) => {
  const cartItems = await db.CartItem.findAll({
    where: { user_id: userId },
    include: [
      {
        model: db.Product,
        as: 'product',
        attributes: ['id', 'name', 'description', 'image', 'priceSale', 'priceOrigin', 'is_hot', 'is_new'],
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

  // Calculate total
  const total = cartItems.reduce((sum, item) => {
    return sum + (parseFloat(item.product.priceSale) * item.quantity);
  }, 0);

  return {
    items: cartItems,
    total: total.toFixed(2),
    count: cartItems.length
  };
};

// Add item to cart
const addItemToCart = async (userId, productId, quantity = 1) => {
  // Check if product exists
  const product = await db.Product.findByPk(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  // Check if item already in cart
  const existingItem = await db.CartItem.findOne({
    where: {
      user_id: userId,
      product_id: productId,
    }
  });

  if (existingItem) {
    // Update quantity if already in cart
    existingItem.quantity += parseInt(quantity);
    await existingItem.save();
    return existingItem;
  } else {
    // Add new item to cart
    const newItem = await db.CartItem.create({
      user_id: userId,
      product_id: productId,
      quantity: parseInt(quantity)
    });
    
    return newItem;
  }
};

// Update cart item quantity
const updateCartItemQuantity = async (userId, cartItemId, quantity) => {
  const cartItem = await db.CartItem.findOne({
    where: {
      id: cartItemId,
      user_id: userId
    }
  });

  if (!cartItem) {
    throw new Error('Cart item not found');
  }

  cartItem.quantity = parseInt(quantity);
  await cartItem.save();
  
  return cartItem;
};

// Remove item from cart
const removeCartItem = async (userId, cartItemId) => {
  const result = await db.CartItem.destroy({
    where: {
      id: cartItemId,
      user_id: userId
    }
  });

  if (result === 0) {
    throw new Error('Cart item not found');
  }
  
  return true;
};

// Clear user's cart
const clearUserCart = async (userId, transaction = null) => {
  await db.CartItem.destroy({
    where: {
      user_id: userId
    },
    transaction
  });
  
  return true;
};

module.exports = {
  getCartItems,
  addItemToCart,
  updateCartItemQuantity,
  removeCartItem,
  clearUserCart
};