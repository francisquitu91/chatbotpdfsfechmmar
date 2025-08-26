import { SYSTEM_PROMPT } from '../config/ai-config';

export function buildPrompt(userQuery: string, context?: string): string {
  const contextPrompt = context 
    ? `Contexto del documento:\n${context}\n\n`
    : '';

  return `${SYSTEM_PROMPT}\n\n${contextPrompt}Consulta: ${userQuery}\n\nRespuesta:`;
}