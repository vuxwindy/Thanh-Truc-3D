const { 
  getAllBanners, 
  getBannerById, 
  createBanner, 
  updateBanner, 
  deleteBanner 
} = require('../services/banner.service');

const getBanners = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await getAllBanners(page, limit);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBanner = async (req, res) => {
  try {
    const banner = await getBannerById(req.params.id);
    res.json(banner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createNewBanner = async (req, res) => {
  try {
    const banner = await createBanner(req.body, req.file);
    res.status(201).json(banner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBannerById = async (req, res) => {
  try {
    const updatedBanner = await updateBanner(req.params.id, req.body, req.file);
    res.json(updatedBanner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBannerById = async (req, res) => {
  try {
    await deleteBanner(req.params.id);
    res.json({ message: 'Banner deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getBanners,
  getBanner,
  createNewBanner,
  updateBannerById,
  deleteBannerById
};