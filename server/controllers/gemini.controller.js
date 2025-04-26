const geminiService = require('../services/gemini.service');

const generateResponse = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        
        if (!req.body || !req.body.prompt) {
            return res.status(400).json({
                success: false,
                message: 'Prompt cannot be empty'
            });
        }
        
        const { prompt } = req.body;
        console.log(`Processing Gemini prompt: "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}"`);
        
        const response = await geminiService.generate(prompt);
        
        res.status(200).json({
            success: true,
            prompt,
            response
        });
    } catch (error) {
        console.error('Error generating response from Gemini:', error);
        res.status(500).json({
            success: false,
            message: 'Error generating response',
            error: error.message
        });
    }
}

module.exports = { generateResponse };