const { GoogleGenAI } = require('@google/genai');

const generate = async (prompt) => {
    try {
        console.log("Using API Key:", process.env.GEMINI_API_KEY ? "API Key is set" : "API Key is missing");
        
        const gemini = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });
        
        const response = await gemini.models.generateContent({ 
            model: "gemini-2.0-flash-thinking-exp-01-21",
            contents: prompt
        });
        
        return response.text;
    } catch (error) {
        console.error("Error during content generation:", error);
        throw error;
    }
};

module.exports = {
    generate
};