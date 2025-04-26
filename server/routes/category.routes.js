const express = require('express');
const router = express.Router();
const { 
  getCategories, 
  getCategory, 
  createNewCategory, 
  updateCategoryById, 
  deleteCategoryById 
} = require('../controllers/category.controller');
const { adminAuthMiddleware } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', getCategories);
router.get('/:id', getCategory);

// Admin only routes
router.post('/', adminAuthMiddleware, createNewCategory);
router.put('/:id', adminAuthMiddleware, updateCategoryById);
router.delete('/:id', adminAuthMiddleware, deleteCategoryById);

module.exports = router;