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
const { listPendingUsers, approveUser, rejectUser } = require('../controllers/admin.controller');
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
    { name: 'idFront', maxCount: 1 },
    { name: 'idBack', maxCount: 1 },
  ]),
  updateUserProfile
);

router.delete('/:id', adminAuthMiddleware, deleteUserById);

// Add this new route
router.put('/:id/change-password', adminAuthMiddleware, changePasswordHandler);

// Admin routes for user approval
router.get('/admin/pending', adminAuthMiddleware, listPendingUsers);
router.post('/admin/:id/approve', adminAuthMiddleware, approveUser);
router.post('/admin/:id/reject', adminAuthMiddleware, rejectUser);

module.exports = router;