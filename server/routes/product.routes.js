const express = require('express');
const router = express.Router();
const { 
  getProducts,
  getProduct, 
  createNewProduct,
  updateProductById, 
  deleteProductById,
  getProductsByCategories  // Import the new function
} = require('../controllers/product.controller');
const { adminAuthMiddleware } = require('../middlewares/auth.middleware');
const multer = require('multer');
const upload = multer();

// Public routes
router.get('/', getProducts);
router.get('/by-categories', getProductsByCategories);  // Add the new route
router.get('/:id', getProduct);

// Protected routes (admin only)
router.post('/', adminAuthMiddleware, upload.single('image'), createNewProduct);
router.put('/:id', adminAuthMiddleware, upload.single('image'), updateProductById);
router.delete('/:id', adminAuthMiddleware, deleteProductById);

module.exports = router;