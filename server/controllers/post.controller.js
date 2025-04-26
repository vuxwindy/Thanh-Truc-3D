const { 
  getAllPosts, 
  getPostById, 
  createPost, 
  updatePost, 
  deletePost 
} = require('../services/post.service');

const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    const result = await getAllPosts(page, limit, search);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await getPostById(req.params.id);
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createNewPost = async (req, res) => {
  try {
    const post = await createPost(req.body, req.user.id);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePostById = async (req, res) => {
  try {
    const updatedPost = await updatePost(req.params.id, req.body, req.user.id);
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePostById = async (req, res) => {
  try {
    await deletePost(req.params.id, req.user.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPosts,
  getPost,
  createNewPost,
  updatePostById,
  deletePostById
};