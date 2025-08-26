import React from 'react';
import { ChatMessage } from './ChatMessage';
import type { Message } from '../types/message';

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function ChatContainer({ messages, isLoading, messagesEndRef }: ChatContainerProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          message={message.text}
          isUser={message.isUser}
          type={message.type}
          audioUrl={message.audioUrl}
        />
      ))}
      {isLoading && (
        <div className="flex gap-2 items-center text-gray-500">
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-.3s]" />
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-.5s]" />
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}