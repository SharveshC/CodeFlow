const functions = require('firebase-functions');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Google AI with server-side API key from environment
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// CORS configuration
const cors = require('cors')({
  origin: true, // Allow all origins for now, restrict in production
});

// AI Chat Proxy Function
exports.aiChat = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { message, conversationHistory = [] } = req.body;

      // Validate input
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Invalid message' });
      }

      // Check if API key is available
      if (!process.env.GOOGLE_AI_API_KEY) {
        return res.status(500).json({ error: 'AI service not configured' });
      }

      // Initialize the model
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      // Build conversation context
      let conversation = '';
      if (conversationHistory.length > 0) {
        conversation = conversationHistory
          .map(msg => `${msg.role}: ${msg.content}`)
          .join('\n') + '\n';
      }
      conversation += `user: ${message}`;

      // Generate response
      const result = await model.generateContent(conversation);
      const response = result.response;
      const text = response.text();

      // Return the AI response
      res.json({
        success: true,
        response: text,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('AI Proxy Error:', error);
      res.status(500).json({
        error: 'Failed to generate AI response',
        details: error.message
      });
    }
  });
});

// Health check function
exports.aiHealth = functions.https.onRequest((req, res) => {
  res.json({
    status: 'healthy',
    service: 'AI Proxy',
    timestamp: new Date().toISOString(),
    apiKeyConfigured: !!process.env.GOOGLE_AI_API_KEY
  });
});
