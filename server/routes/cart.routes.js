const express = require('express');
const router = express.Router();
const { 
  getCart, 
  addToCart, 
  updateCartItem, 
  removeFromCart, 
  clearCart 
} = require('../controllers/cart.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

// All cart routes require authentication
router.use(authMiddleware);

// Get cart items
router.get('/', getCart);

// Add item to cart
router.post('/add', addToCart);

// Update cart item quantity
router.put('/update/:cartItemId', updateCartItem);

// Remove item from cart
router.delete('/remove/:cartItemId', removeFromCart);

// Clear cart
router.delete('/clear', clearCart);

module.exports = router;