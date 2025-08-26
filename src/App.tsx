import React, { useEffect } from 'react';
import { ChatContainer } from './components/ChatContainer';
import { ChatInput } from './components/ChatInput';
import { FileUpload } from './components/FileUpload';
import { Tutorial } from './components/Tutorial';
import { useChat } from './hooks/useChat';

export function App() {
  const {
    messages,
    input,
    isLoading,
    messagesEndRef,
    setInput,
    handleSend,
    handleAudioMessage,
    handleFileSelect,
    scrollToBottom
  } = useChat();

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="h-[600px] flex flex-col">
          <div className="p-4 bg-gray-800 text-white" id="header">
            <h1 className="text-xl font-bold">ReglaMar IA</h1>
          </div>

          <ChatContainer
            messages={messages}
            isLoading={isLoading}
            messagesEndRef={messagesEndRef}
          />

          <div className="p-4 border-t relative" id="file-upload">
            <div className="flex justify-end mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">powered by</span>
                <a 
                  href="https://comerciandola.cl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <img 
                    src="https://i.ibb.co/dWt0LbP/Whats-App-Image-2024-12-05-at-12-37-24-PM.jpg" 
                    alt="Comerciandola SPA" 
                    className="h-4 object-contain"
                  />
                  <span 
                    style={{ 
                      fontFamily: "Bebas Neue",
                      opacity: 1,
                      transform: "none"
                    }} 
                    className="text-xs tracking-wider text-gray-900 font-bold"
                  >
                    COMERCIANDOLA
                  </span>
                </a>
              </div>
            </div>
            <FileUpload onFileSelect={handleFileSelect} />
          </div>

          <div className="p-4 border-t" id="input-section">
            <ChatInput
              input={input}
              isLoading={isLoading}
              onInputChange={(e) => setInput(e.target.value)}
              onSend={handleSend}
              onAudioMessage={handleAudioMessage}
            />
          </div>
        </div>
      </div>
      <Tutorial />
    </div>
  );
}