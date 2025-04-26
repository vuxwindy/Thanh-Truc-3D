const db = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const getAllUsers = async (page = 1, limit = 10, search = '') => {
  const offset = (page - 1) * limit;
  const whereClause = search ? {
    [Op.or]: [
      { fullName: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } }
    ]
  } : {};

  const { count, rows } = await db.User.findAndCountAll({
    where: whereClause,
    limit,
    offset,
    attributes: { exclude: ['password'] },
    include: [{
      model: db.Role,
      as: 'roles', // Add the alias that matches your model association
      through: { attributes: [] },
      attributes: ['id', 'role_name']
    }],
    order: [['ID', 'DESC']]
  });

  return {
    users: rows,
    totalItems: count,
    currentPage: page,
    totalPages: Math.ceil(count / limit)
  };
};

const getUserById = async (userId) => {
  const user = await db.User.findByPk(userId, {
    attributes: { exclude: ['password'] }
  });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const createUser = async (userData) => {
  const existingUser = await db.User.findOne({
    where: { email: userData.email }
  });

  if (existingUser) {
    throw new Error('Email already exists');
  }

  // Hash password before saving
  if (userData.password) {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
  }

  return await db.User.create(userData);
};

const updateUser = async (userId, updateData) => {
  const user = await db.User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (updateData.email) {
    const existingUser = await db.User.findOne({
      where: {
        email: updateData.email,
        id: { [Op.ne]: userId }
      }
    });

    if (existingUser) {
      throw new Error('Email already exists');
    }
  }

  // Remove password from update data
  const { password, ...dataToUpdate } = updateData;
  
  return await user.update(dataToUpdate);
};

const changePassword = async (userId, { newPassword }) => {
  const user = await db.User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Hash and update new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  
  await user.update({ password: hashedPassword });
  return { message: 'Password updated successfully' };
};

const deleteUser = async (userId) => {
  const user = await db.User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  await user.destroy();
  return { message: 'User deleted successfully' };
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changePassword  // Add this to exports
};