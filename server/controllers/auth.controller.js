const { 
  register, 
  verifyAndCompleteRegistration, 
  login, 
  forgotPassword, 
  resetPassword ,
  adminLogin,
} = require('../services/auth.service');

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
    const { email, code, ...userData } = req.body;
    const result = await verifyAndCompleteRegistration(email, code, {
      ...userData,
      email
    });
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