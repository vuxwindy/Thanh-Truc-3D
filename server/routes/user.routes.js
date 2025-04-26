const express = require('express');
const router = express.Router();
const { 
  getUsers,
  getUser, 
  createNewUser,
  updateUserProfile, 
  deleteUserById, 
  changePasswordHandler
} = require('../controllers/user.controller');
const { adminAuthMiddleware, authMiddleware } = require('../middlewares/auth.middleware');
const multer = require('multer');
const storage = multer.memoryStorage(); // Lưu vào RAM để xử lý file trực tiếp
const upload = multer({ storage });

// Public routes
router.get('/', getUsers);
router.get('/:id', getUser);

// Protected routes (admin only)
router.post('/', adminAuthMiddleware, createNewUser);
router.put(
  '/:id',
  authMiddleware,
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'passportImage', maxCount: 1 },
  ]),
  updateUserProfile
);

router.delete('/:id', adminAuthMiddleware, deleteUserById);

// Add this new route
router.put('/:id/change-password', adminAuthMiddleware, changePasswordHandler);

module.exports = router;