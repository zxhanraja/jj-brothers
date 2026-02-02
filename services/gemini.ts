
import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini with the API key from environment variables.
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  console.warn("VITE_GEMINI_API_KEY is missing. AI features will be disabled.");
}
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getAIJobMatch = async (resumeText: string, jobDescription: string) => {
  try {
    if (!ai) return null;
    const response = await ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: `Compare this resume: "${resumeText}" with this job description: "${jobDescription}". Rate the match score out of 100 and give 3 specific bullet points for improvement. Return in JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
            reasoning: { type: Type.STRING }
          },
          required: ["score", "improvements", "reasoning"],
          propertyOrdering: ["score", "improvements", "reasoning"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (err) {
    console.error("AI Error:", err);
    return null;
  }
};

export const getAIChatResponse = async (history: { role: string, parts: string }[], userMessage: string) => {
  try {
    if (!ai) return "AI is currently unavailable. Please call our support.";
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [...history.map(h => ({ role: h.role, parts: [{ text: h.parts }] })), { role: 'user', parts: [{ text: userMessage }] }],
      config: {
        systemInstruction: `You are the AI Assistant for JJ Brothers Consultancy. 
        CRITICAL: Keep your responses EXTREMELY SHORT and CONCISE (max 2-3 short sentences). 
        Do not write long paragraphs. If the user asks for details, give them very briefly.
        1. Support all major Indian languages (Hindi, Bengali, Marathi, Tamil, Telugu, etc.). Respond in the same language.
        2. Be polite and professional.
        3. Only discuss overseas jobs, visa, and migration.
        4. If it's a complex doubt, tell them to call the office: 08777245016.`,
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (err) {
    console.error("Chat Error:", err);
    return "I'm having trouble. Please try again or call our support.";
  }
};

export const generateJobDescription = async (title: string, company: string) => {
  try {
    if (!ai) return "Failed to generate description.";
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a professional, modern job description for a ${title} role at ${company}. Focus on Gulf market standards. Return text.`,
    });
    return response.text;
  } catch (err) {
    console.error("AI Error:", err);
    return "Failed to generate description.";
  }
}
