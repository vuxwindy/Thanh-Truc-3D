const bcrypt = require('bcryptjs');
const { generateToken } = require('../config/jwt');
const { sendVerificationEmail } = require('../config/email');
const { saveVerificationCode, verifyCode } = require('./redis.service');
const db = require('../models');
const { Op } = require('sequelize');
const { ADMIN_ROLE_NAME } = require('../constant');
const { CUSTOMER_ROLE_ID } = require('../constant');

const generateRandomCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const login = async (email, password) => {
  const user = await db.User.findOne({
    where: { email },
    include: [{
      model: db.Role,
      through: { 
        model: db.UserRole,
        attributes: [] 
      },
      as: 'roles',
      attributes: ['id', 'role_name'],
      required: false
    }]
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check if user has customer role
  const hasCustomerRole = user.roles && user.roles.some(role => role.id === CUSTOMER_ROLE_ID);
  if (!hasCustomerRole) {
    throw new Error('Invalid user credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken({ 
    id: user.id, 
    email: user.email,
    roles: user.roles.map(role => role.role_name)
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      roles: user.roles.map(role => role.role_name)
    },
    token,
  };
};

const verifyAndCompleteRegistration = async (email, code, userData) => {
  // Verify code
  const isValid = await verifyCode(email, code);
  if (!isValid) {
    throw new Error('Invalid or expired verification code');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  // Create user
  const user = await db.User.create({
    ...userData,
    password: hashedPassword,
  });

  // Assign customer role
  await db.UserRole.create({
    user_id: user.id,
    role_id: CUSTOMER_ROLE_ID
  });

  // Fetch user with roles
  const userWithRoles = await db.User.findOne({
    where: { id: user.id },
    include: [{
      model: db.Role,
      through: { attributes: [] },
      as: 'roles',
      attributes: ['id', 'role_name']
    }]
  });

  // Generate token
  const token = generateToken({ 
    id: user.id, 
    email: user.email,
    roles: userWithRoles.roles.map(role => role.role_name)
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      roles: userWithRoles.roles.map(role => role.role_name)
    },
    token,
  };
};

const register = async (userData) => {
  const { email, phone } = userData;

  // Check if email or phone already exists
  const existingUser = await db.User.findOne({
    where: {
      [Op.or]: [{ email }, { phone }],
    },
  });

  if (existingUser) {
    throw new Error('Email or phone number already exists');
  }

  // Generate verification code
  const code = generateRandomCode();

  // Save code to Redis
  await saveVerificationCode(email, code);

  // Send verification email
  await sendVerificationEmail(email, code);

  return { message: 'Verification code sent successfully' };
};

// New functions for forgot password
const forgotPassword = async (email) => {
  // Check if user exists
  const user = await db.User.findOne({
    where: { email },
  });

  if (!user) {
    throw new Error('User with this email does not exist');
  }

  // Generate verification code
  const code = generateRandomCode();

  // Save code to Redis
  await saveVerificationCode(email, code);

  // Send verification email
  await sendVerificationEmail(email, code);

  return { message: 'Verification code sent successfully' };
};

const resetPassword = async (email, code, newPassword) => {
  // Verify code
  const isValid = await verifyCode(email, code);
  if (!isValid) {
    throw new Error('Invalid or expired verification code');
  }

  // Find user
  const user = await db.User.findOne({
    where: { email },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update user password
  await user.update({ password: hashedPassword });

  return { message: 'Password reset successfully' };
};

const adminLogin = async (email, password) => {
  // Find user with their roles
  const user = await db.User.findOne({
    where: { email },
    include: [{
      model: db.Role,
      through: { 
        model: db.UserRole,
        attributes: [] // Don't include junction table attributes
      },
      as: 'roles',
      attributes: ['id', 'role_name'], // Only include these role attributes
      required: false // Use left join to get all roles
    }]
  });

  if (!user) {
    throw new Error('Invalid admin credentials');
  }
  // Check if user has admin role
  const hasAdminRole = user.roles && user.roles.some(role => role.role_name === ADMIN_ROLE_NAME);
  
  if (!hasAdminRole) {
    throw new Error('Invalid admin credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid admin credentials');
  }

  const token = generateToken({ 
    id: user.id, 
    email: user.email,
    isAdmin: true,
    roles: user.roles.map(role => role.role_name)
  });

  return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        isAdmin: true,
        roles: user.roles.map(role => role.role_name)
      },
      token,
  };
};

module.exports = {
  login,
  register,
  verifyAndCompleteRegistration,
  forgotPassword,
  resetPassword,
  adminLogin
};