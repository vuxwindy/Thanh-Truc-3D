const db = require('../models');
const { Op } = require('sequelize');

const getAllPosts = async (page = 1, limit = 10, search = '') => {
  const offset = (page - 1) * limit;
  const whereClause = search ? {
    content: { [Op.like]: `%${search}%` }
  } : {};

  const { count, rows } = await db.Post.findAndCountAll({
    where: whereClause,
    include: [{
      model: db.User,
      as: 'user',
      attributes: ['id', 'fullName', 'email', 'avatar']
    }],
    limit: limit ? parseInt(limit) : null,
    offset: offset ? parseInt(offset) : null,
    order: [['id', 'DESC']]
  });

  return {
    posts: rows,
    totalItems: count,
    currentPage: page,
    totalPages: Math.ceil(count / limit)
  };
};

const getPostById = async (postId) => {
  const post = await db.Post.findByPk(postId, {
    include: [{
      model: db.User,
      as: 'user',
      attributes: ['id', 'fullName', 'email', 'avatar']
    }]
  });
  
  if (!post) {
    throw new Error('Post not found');
  }
  
  return post;
};

const createPost = async (postData, userId) => {
  return await db.Post.create({
    ...postData,
    user_id: userId
  });
};

const updatePost = async (postId, postData, userId) => {
  const post = await db.Post.findByPk(postId);
  if (!post) {
    throw new Error('Post not found');
  }

  // Check if the user is the owner of the post
  if (post.user_id !== userId) {
    throw new Error('You are not authorized to update this post');
  }

  return await post.update(postData);
};

const deletePost = async (postId, userId) => {
  const post = await db.Post.findByPk(postId);
  if (!post) {
    throw new Error('Post not found');
  }

  // Check if the user is the owner of the post
  if (post.user_id !== userId) {
    throw new Error('You are not authorized to delete this post');
  }

  await post.destroy();
  return { message: 'Post deleted successfully' };
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};