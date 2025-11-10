const { 
  register, 
  verifyAndCompleteRegistration, 
  login, 
  forgotPassword, 
  resetPassword ,
  adminLogin,
} = require('../services/auth.service');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const registerUser = async (req, res) => {
  try {
    const result = await register(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verifyRegistration = async (req, res) => {
  try {
    // If multipart, files are in req.files; other fields in req.body
    const { email, code } = req.body;
    const userData = { ...req.body, email };

    // Handle ID images if provided
    const files = req.files || {};
    let idFrontPath = null;
    let idBackPath = null;

    const uploadsDir = path.join(__dirname, '../uploads/id');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // helper to resize to width 1280 or height 720 (keep within 720p)
    const resizeTo720p = async (buffer, outPath) => {
      // Resize so that the larger dimension is 1280x720 proportionally; we'll fit within 1280x720
      await sharp(buffer)
        .resize({ width: 1280, height: 720, fit: 'inside' })
        .toFile(outPath);
    };

    if (files.idFront && files.idFront[0]) {
      const frontFile = files.idFront[0];
      const frontFileName = `${Date.now()}-front${path.extname(frontFile.originalname)}`;
      const outFront = path.join(uploadsDir, frontFileName);
      await resizeTo720p(frontFile.buffer, outFront);
      idFrontPath = path.join('id', frontFileName);
    }

    if (files.idBack && files.idBack[0]) {
      const backFile = files.idBack[0];
      const backFileName = `${Date.now()}-back${path.extname(backFile.originalname)}`;
      const outBack = path.join(uploadsDir, backFileName);
      await resizeTo720p(backFile.buffer, outBack);
      idBackPath = path.join('id', backFileName);
    }

    // Pass id paths in userData to service; idStatus will default to pending
    if (idFrontPath) userData.idFrontImage = idFrontPath;
    if (idBackPath) userData.idBackImage = idBackPath;

    const result = await verifyAndCompleteRegistration(email, code, userData);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await adminLogin(email, password);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// New controller functions for forgot password
const forgotPasswordHandler = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await forgotPassword(email);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const resetPasswordHandler = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    const result = await resetPassword(email, code, newPassword);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  verifyRegistration,
  loginUser,
  loginAdmin,
  forgotPasswordHandler,
  resetPasswordHandler,
};