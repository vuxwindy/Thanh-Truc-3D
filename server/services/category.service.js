const db = require('../models');
const { Op } = require('sequelize');

const getAllCategories = async (page = 1, limit = 10, search = '') => {
  const offset = (page - 1) * limit;
  const whereClause = search ? {
    name: { [Op.like]: `%${search}%` }
  } : {};

  const { count, rows } = await db.Category.findAndCountAll({
    where: whereClause,
    // limit: limit ? parseInt(limit) : null,
    // offset: offset ? parseInt(offset) : null,
    order: [['id', 'DESC']]
  });

  return {
    categories: rows,
    totalItems: count,
    currentPage: page,
    totalPages: Math.ceil(count / limit)
  };
};

const getCategoryById = async (categoryId) => {
  const category = await db.Category.findByPk(categoryId);
  
  if (!category) {
    throw new Error('Category not found');
  }
  
  return category;
};

const createCategory = async (categoryData) => {
  // Check if category with same name exists
  const existingCategory = await db.Category.findOne({
    where: { name: categoryData.name }
  });
  
  if (existingCategory) {
    throw new Error('Category with this name already exists');
  }
  
  return await db.Category.create(categoryData);
};

const updateCategory = async (categoryId, categoryData) => {
  const category = await db.Category.findByPk(categoryId);
  if (!category) {
    throw new Error('Category not found');
  }

  // Check if name is being updated and if it already exists
  if (categoryData.name && categoryData.name !== category.name) {
    const existingCategory = await db.Category.findOne({
      where: { name: categoryData.name }
    });
    
    if (existingCategory) {
      throw new Error('Category with this name already exists');
    }
  }

  return await category.update(categoryData);
};

const deleteCategory = async (categoryId) => {
  const category = await db.Category.findByPk(categoryId);
  if (!category) {
    throw new Error('Category not found');
  }

  await category.destroy();
  return { message: 'Category deleted successfully' };
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};