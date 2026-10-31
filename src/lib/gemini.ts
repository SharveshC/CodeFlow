import { GoogleGenerativeAI } from '@google/generative-ai';

const AI_ENDPOINT = import.meta.env.VITE_AI_ENDPOINT;
const GEMINI_API_KEY =
  import.meta.env.VITE_GEMINI_API_KEY ||
  import.meta.env.VITE_GOOGLE_AI_API_KEY;

export interface GeminiMessage {
  role: 'user' | 'model';
  text: string;
}

/**
 * Send a message to Gemini AI and return response text.
 * When client API key is provided, calls Google Generative AI directly.
 * Otherwise, falls back to the configured backend endpoint.
 */
export async function askGemini(
  history: GeminiMessage[],
  newMessage: string,
  systemInstruction?: string
): Promise<string> {
  // If client-side Gemini key is available, call SDK directly
  if (GEMINI_API_KEY) {
    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      // Try modern Gemini models in order of preference
      const models = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash'];
      let lastError: any = null;

      for (const modelName of models) {
        try {
          const model = genAI.getGenerativeModel({
            model: modelName,
            systemInstruction: systemInstruction
              ? { role: 'system', parts: [{ text: systemInstruction }] }
              : undefined,
          });

          const formattedHistory = history.map((m) => ({
            role: m.role,
            parts: [{ text: m.text }],
          }));

          const chat = model.startChat({
            history: formattedHistory,
          });

          const result = await chat.sendMessage(newMessage);
          const response = await result.response;
          const text = response.text();
          if (text) {
            return text;
          }
        } catch (err: any) {
          lastError = err;
          console.warn(`Model ${modelName} failed, trying next model:`, err?.message);
        }
      }

      if (lastError && !AI_ENDPOINT) {
        throw lastError;
      }
    } catch (sdkError: any) {
      console.error('Gemini SDK Error:', sdkError);
      if (!AI_ENDPOINT) {
        throw new Error(sdkError.message || 'Gemini API call failed');
      }
    }
  }

  // Fallback to backend endpoint if configured
  if (AI_ENDPOINT) {
    try {
      const response = await fetch(AI_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: newMessage,
          conversationHistory: history,
          systemInstruction: systemInstruction,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI Backend error (${response.status}): ${response.statusText}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(`AI Backend error: ${data.error}`);
      }

      return data.response || 'No response available';
    } catch (endpointError: any) {
      console.error('AI Endpoint Error:', endpointError);
      throw endpointError instanceof Error ? endpointError : new Error(String(endpointError));
    }
  }

  throw new Error('Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your .env file.');
}
