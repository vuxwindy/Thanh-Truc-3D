const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  verifyRegistration, 
  loginUser,
  forgotPasswordHandler,
  resetPasswordHandler,
  loginAdmin,
} = require('../controllers/auth.controller');

router.post('/register', registerUser);
router.post('/verify', verifyRegistration);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPasswordHandler);
router.post('/reset-password', resetPasswordHandler);

router.post('/admin/login', loginAdmin);
module.exports = router;