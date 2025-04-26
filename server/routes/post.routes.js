const express = require('express');
const router = express.Router();
const { 
  getPosts, 
  getPost, 
  createNewPost, 
  updatePostById, 
  deletePostById 
} = require('../controllers/post.controller');
const { adminAuthMiddleware } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', getPosts);
router.get('/:id', getPost);

// Authenticated user routes
router.post('/', adminAuthMiddleware, createNewPost);
router.put('/:id', adminAuthMiddleware, updatePostById);
router.delete('/:id', adminAuthMiddleware, deletePostById);

// Admin can manage all posts
router.delete('/admin/:id', adminAuthMiddleware, deletePostById);

module.exports = router;