import React from 'react';
import { Send } from 'lucide-react';
import { AudioInput } from './AudioInput';

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  onAudioMessage: (text: string, audioUrl: string) => void;
}

export function ChatInput({ 
  input, 
  isLoading, 
  onInputChange, 
  onSend, 
  onAudioMessage 
}: ChatInputProps) {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={onInputChange}
        onKeyPress={(e) => e.key === 'Enter' && onSend()}
        placeholder="Escribe tu consulta sobre reglamentación marítima..."
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <AudioInput onAudioMessage={onAudioMessage} />
      <button
        onClick={onSend}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
}