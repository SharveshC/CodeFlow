/**
 * Gemini REST API helper — no SDK required.
 * Uses the gemini-2.0-flash model via the generateContent endpoint.
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
const GEMINI_MODEL = 'gemini-1.5-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent`;

export interface GeminiMessage {
    role: 'user' | 'model';
    text: string;
}

/**
 * Send a message to the Gemini API and return the response text.
 * @param history  Previous messages in the conversation
 * @param newMessage  The new user message
 * @param systemInstruction  Optional system prompt
 */
export async function askGemini(
    history: GeminiMessage[],
    newMessage: string,
    systemInstruction?: string
): Promise<string> {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
        throw new Error(
            'Gemini API key not configured. Add VITE_GEMINI_API_KEY to your .env file.\n' +
            'Get a free key at: https://aistudio.google.com/app/apikey'
        );
    }

    // Build conversation contents
    const contents = [
        // History (exclude the latest user message — we send it separately)
        ...history.map((msg) => ({
            role: msg.role,
            parts: [{ text: msg.text }],
        })),
        // New user message
        {
            role: 'user',
            parts: [{ text: newMessage }],
        },
    ];

    const body: Record<string, unknown> = { contents };

    if (systemInstruction) {
        body.system_instruction = {
            parts: [{ text: systemInstruction }],
        };
    }

    const res = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`Gemini API error (${res.status}): ${errBody}`);
    }

    const data = await res.json();
    const text: string =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '(no response)';
    return text;
}
