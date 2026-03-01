// Netlify Function for AI Proxy
// File: netlify/functions/ai-chat.js

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Google AI with server-side API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { message, conversationHistory = [] } = JSON.parse(event.body);

    // Validate input
    if (!message || typeof message !== 'string') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid message' })
      };
    }

    // Check if API key is available
    if (!process.env.GOOGLE_AI_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'AI service not configured' })
      };
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
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        response: text,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('AI Proxy Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to generate AI response',
        details: error.message
      })
    };
  }
};
