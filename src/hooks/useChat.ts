import { useState, useRef, useCallback } from 'react';
import { getGeminiResponse } from '../lib/gemini';
import type { Message } from '../types/message';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documentContent, setDocumentContent] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true, type: 'text' }]);
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(userMessage, documentContent || undefined);
      setMessages(prev => [...prev, { text: response, isUser: false, type: 'text' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: 'Lo siento, encontré un error. Por favor, intenta de nuevo.',
        isUser: false,
        type: 'text'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAudioMessage = async (text: string, audioUrl: string) => {
    setMessages(prev => [...prev, { 
      text,
      isUser: true,
      type: 'audio',
      audioUrl
    }]);
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(text, documentContent || undefined);
      setMessages(prev => [...prev, { text: response, isUser: false, type: 'text' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: 'Lo siento, encontré un error. Por favor, intenta de nuevo.',
        isUser: false,
        type: 'text'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = async (content: string) => {
    setDocumentContent(content);
    setMessages(prev => [...prev, { 
      text: '¡Documento cargado exitosamente! Ahora puedes hacer preguntas sobre su contenido.',
      isUser: false,
      type: 'text'
    }]);
  };

  return {
    messages,
    input,
    isLoading,
    messagesEndRef,
    setInput,
    handleSend,
    handleAudioMessage,
    handleFileSelect,
    scrollToBottom
  };
}