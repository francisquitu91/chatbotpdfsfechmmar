import { GoogleGenerativeAI } from '@google/generative-ai';
import { AI_CONFIG } from '../config/ai-config';
import { buildPrompt } from './prompt-builder';

const API_KEY = 'AIzaSyDnnnXN52KhfAV99E5hLF-3vkbhvftLPDw';
const genAI = new GoogleGenerativeAI(API_KEY);

export async function getGeminiResponse(prompt: string, context?: string) {
  const model = genAI.getGenerativeModel({ model: AI_CONFIG.model });

  try {
    const fullPrompt = buildPrompt(prompt, context);
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
      generationConfig: {
        temperature: AI_CONFIG.temperature,
        topK: AI_CONFIG.topK,
        topP: AI_CONFIG.topP,
      },
    });
    
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error al obtener respuesta de Gemini:', error);
    throw error;
  }
}