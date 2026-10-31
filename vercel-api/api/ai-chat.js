// Vercel Serverless Function for AI Chat API
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, language, code, conversationHistory, systemInstruction } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GOOGLE_AI_API_KEY is not configured on the server' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: systemInstruction
        ? { role: 'system', parts: [{ text: systemInstruction }] }
        : undefined,
    });

    const formattedHistory = Array.isArray(conversationHistory)
      ? conversationHistory.map((m) => ({
          role: m.role,
          parts: [{ text: m.text }],
        }))
      : [];

    const chat = model.startChat({
      history: formattedHistory,
    });

    let prompt = message;
    if (language && code && !systemInstruction) {
      prompt = `I'm working with ${language} code. Here's my current code:\n\n\`\`\`${language}\n${code}\n\`\`\`\n\n${message}`;
    }

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ response: text });
  } catch (error) {
    console.error('AI API Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate AI response',
      details: error.message 
    });
  }
}
