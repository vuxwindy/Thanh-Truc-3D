const db = require('../models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

const getAllProducts = async (page = 1, limit = 10, search = '', categoryId = null) => {
  const offset = (page - 1) * limit;
  
  // Build where clause based on search and categoryId
  let whereClause = {};
  
  if (search) {
    whereClause = {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ]
    };
  }
  
  // Add category filter if categoryId is provided
  if (categoryId) {
    whereClause.category_id = categoryId;
  }
  
  const { count, rows } = await db.Product.findAndCountAll({
    where: whereClause,
    limit: limit ? parseInt(limit) : null,
    offset: offset ? parseInt(offset) : null,
    order: [['id', 'DESC']],
    include: [{
      model: db.Category,
      as: 'category',
      attributes: ['id', 'name']
    }]
  });

  return {
    products: rows,
    totalItems: count,
    currentPage: page,
    totalPages: Math.ceil(count / limit)
  };
};

const getProductById = async (productId) => {
  const product = await db.Product.findByPk(productId, {
    include: [{
      model: db.Category,
      as: 'category',
      attributes: ['id', 'name']
    }]
  });
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  return product;
};

const createProduct = async (productData, imageFile) => {
  // Handle image upload if provided
  let imagePath = null;
  if (imageFile) {
    const uploadDir = path.join(__dirname, '../uploads/products');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const fileName = `product-${Date.now()}${path.extname(imageFile.originalname)}`;
    imagePath = `products/${fileName}`;
    
    fs.writeFileSync(path.join(uploadDir, fileName), imageFile.buffer);
  }

  // Create product with image path
  return await db.Product.create({
    ...productData,
    image: imagePath
  });
};

const updateProduct = async (productId, productData, imageFile) => {
  const product = await db.Product.findByPk(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  // Handle image upload if provided
  let imagePath = product.image;
  if (imageFile) {
    const uploadDir = path.join(__dirname, '../uploads/products');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    // Delete old image if exists
    if (product.image) {
      const oldImagePath = path.join(__dirname, '../uploads', product.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    
    const fileName = `product-${productId}-${Date.now()}${path.extname(imageFile.originalname)}`;
    imagePath = `products/${fileName}`;
    
    fs.writeFileSync(path.join(uploadDir, fileName), imageFile.buffer);
  }

  // Update product with new data and image path
  return await product.update({
    ...productData,
    image: imagePath
  });
};

const deleteProduct = async (productId) => {
  const product = await db.Product.findByPk(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  // Delete product image if exists
  if (product.image) {
    const imagePath = path.join(__dirname, '../uploads', product.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  await product.destroy();
  return { message: 'Product deleted successfully' };
};

const getOneProductPerCategory = async () => {
  // Get all categories
  const categories = await db.Category.findAll();
  
  // For each category, get one product
  const results = [];
  
  for (const category of categories) {
    const product = await db.Product.findOne({
      where: { category_id: category.id },
      include: [{
        model: db.Category,
        as: 'category',
        attributes: ['id', 'name']
      }]
    });
    
    if (product) {
      results.push({
        category: {
          id: category.id,
          name: category.name
        },
        product
      });
    }
  }
  
  return { categoryProducts: results };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getOneProductPerCategory  // Add the new function to exports
};