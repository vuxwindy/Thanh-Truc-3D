const express = require('express');
const router = express.Router();
const { 
  getBanners, 
  getBanner, 
  createNewBanner, 
  updateBannerById, 
  deleteBannerById 
} = require('../controllers/banner.controller');
const { adminAuthMiddleware } = require('../middlewares/auth.middleware');
const multer = require('multer');
const upload = multer();

// Public routes
router.get('/', getBanners);
router.get('/:id', getBanner);

// Admin only routes
router.post('/', adminAuthMiddleware, upload.single('image'), createNewBanner);
router.put('/:id', adminAuthMiddleware, upload.single('image'), updateBannerById);
router.delete('/:id', adminAuthMiddleware, deleteBannerById);

module.exports = router;