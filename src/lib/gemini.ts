/**
 * Gemini REST API helper — no SDK required.
 * Uses gemini-1.5-flash via the stable v1 endpoint.
 *
 * Note: v1 doesn't support the `system_instruction` field.
 * We inject the system prompt as a user→model turn at the start of the
 * conversation instead (standard workaround).
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
 * @param systemInstruction  Optional system context (injected as first turn)
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

    // v1 doesn't support system_instruction field, so we inject the system
    // prompt as a user→model handshake at the very beginning of the chat.
    const systemTurn = systemInstruction
        ? [
            { role: 'user', parts: [{ text: systemInstruction }] },
            { role: 'model', parts: [{ text: 'Understood. I will follow those instructions.' }] },
        ]
        : [];

    const contents = [
        ...systemTurn,
        ...history.map((msg) => ({
            role: msg.role,
            parts: [{ text: msg.text }],
        })),
        // New user message
        { role: 'user', parts: [{ text: newMessage }] },
    ];

    const res = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents }),
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
