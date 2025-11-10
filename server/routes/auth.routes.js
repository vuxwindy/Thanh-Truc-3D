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
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/register', registerUser);
// Expect multipart/form-data with fields: email, code, password, fullName, phone and files idFront, idBack
router.post('/verify', upload.fields([{ name: 'idFront', maxCount: 1 }, { name: 'idBack', maxCount: 1 }]), verifyRegistration);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPasswordHandler);
router.post('/reset-password', resetPasswordHandler);

router.post('/admin/login', loginAdmin);
module.exports = router;