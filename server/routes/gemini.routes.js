const express = require('express');
const router = express.Router();
const { generateResponse } = require('../controllers/gemini.controller');

// Generate response from Gemini based on prompt
router.post('/generate', generateResponse);

module.exports = router; 