import React from 'react';
import { MessageCircle, Bot } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';
import { AudioMessage } from './AudioMessage';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  type?: 'text' | 'audio';
  audioUrl?: string;
}

export function ChatMessage({ message, isUser, type = 'text', audioUrl }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-500' : 'bg-gray-600'
      }`}>
        {isUser ? (
          <MessageCircle className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>
      <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
        isUser ? 'bg-blue-500 text-white' : 'bg-gray-100'
      }`}>
        {type === 'audio' && audioUrl ? (
          <AudioMessage audioUrl={audioUrl} />
        ) : isUser ? (
          <p className="whitespace-pre-wrap">{message}</p>
        ) : (
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <MarkdownRenderer content={message} />
          </div>
        )}
      </div>
    </div>
  );
}