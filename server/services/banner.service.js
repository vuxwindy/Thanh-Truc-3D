const db = require('../models');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

const getAllBanners = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  const { count, rows } = await db.Banner.findAndCountAll({
    limit: limit ? parseInt(limit) : null,
    offset: offset ? parseInt(offset) : null,
    order: [['order', 'ASC'], ['id', 'DESC']]
  });

  return {
    banners: rows,
    totalItems: count,
    currentPage: page,
    totalPages: Math.ceil(count / limit)
  };
};

const getBannerById = async (bannerId) => {
  const banner = await db.Banner.findByPk(bannerId);
  
  if (!banner) {
    throw new Error('Banner not found');
  }
  
  return banner;
};

const createBanner = async (bannerData, imageFile) => {
  // Handle image upload if provided
  let imagePath = null;
  if (imageFile) {
    const uploadDir = path.join(__dirname, '../uploads/banners');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const fileName = `banner-${Date.now()}${path.extname(imageFile.originalname)}`;
    imagePath = `banners/${fileName}`;
    
    fs.writeFileSync(path.join(uploadDir, fileName), imageFile.buffer);
  }

  // Create banner with image path
  return await db.Banner.create({
    ...bannerData,
    image: imagePath
  });
};

const updateBanner = async (bannerId, bannerData, imageFile) => {
  const banner = await db.Banner.findByPk(bannerId);
  if (!banner) {
    throw new Error('Banner not found');
  }

  // Handle image upload if provided
  let imagePath = banner.image;
  if (imageFile) {
    const uploadDir = path.join(__dirname, '../uploads/banners');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    // Delete old image if exists
    if (banner.image) {
      const oldImagePath = path.join(__dirname, '../uploads', banner.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    
    const fileName = `banner-${bannerId}-${Date.now()}${path.extname(imageFile.originalname)}`;
    imagePath = `banners/${fileName}`;
    
    fs.writeFileSync(path.join(uploadDir, fileName), imageFile.buffer);
  }

  // Update banner with new data and image path
  return await banner.update({
    ...bannerData,
    image: imagePath
  });
};

const deleteBanner = async (bannerId) => {
  const banner = await db.Banner.findByPk(bannerId);
  if (!banner) {
    throw new Error('Banner not found');
  }

  // Delete banner image if exists
  if (banner.image) {
    const imagePath = path.join(__dirname, '../uploads', banner.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  await banner.destroy();
  return { message: 'Banner deleted successfully' };
};

module.exports = {
  getAllBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner
};