/**
 * AI API helper — works with any backend endpoint
 * Can use Vercel, Netlify, or custom backend
 */

// Configure your backend endpoint here
const AI_ENDPOINT = import.meta.env.VITE_AI_ENDPOINT || 'https://your-app.vercel.app/api/ai-chat';

export interface GeminiMessage {
    role: 'user' | 'model';
    text: string;
}

/**
 * Send a message to AI backend and return response text.
 * @param history  Previous messages in conversation
 * @param newMessage  The new user message
 * @param systemInstruction  Optional system context
 */
export async function askGemini(
    history: GeminiMessage[],
    newMessage: string,
    systemInstruction?: string
): Promise<string> {
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
    } catch (error) {
        console.error('AI API Error:', error);
        throw error instanceof Error ? error.message : 'Unknown error occurred';
    }
}
