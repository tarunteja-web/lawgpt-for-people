
import React, { useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Message } from '@/types/chat';
import TypingIndicator from './TypingIndicator';

interface MessageListProps {
  messages: Message[];
  isDarkMode: boolean;
  isLoading?: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isDarkMode, isLoading = false }) => {
  const isMobile = useIsMobile();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="h-full overflow-y-auto">
      <div className={`max-w-4xl mx-auto w-full px-3 sm:px-4 py-3 sm:py-4`}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-3 sm:mb-4 md:mb-6 ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            {!message.isUser && (
              <div className={`rounded-2xl p-3 sm:p-4 max-w-[85%] sm:max-w-[80%] md:max-w-md ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <p className={`${isMobile ? 'text-sm' : 'text-sm'} leading-relaxed ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>{message.text}</p>
              </div>
            )}
            {message.isUser && (
              <div className={`rounded-2xl p-3 sm:p-4 max-w-[85%] sm:max-w-[80%] md:max-w-md ${
                isDarkMode ? 'bg-blue-600' : 'bg-black'
              }`}>
                <p className={`${isMobile ? 'text-sm' : 'text-sm'} text-white leading-relaxed`}>{message.text}</p>
              </div>
            )}
          </div>
        ))}
        
        {isLoading && <TypingIndicator isDarkMode={isDarkMode} />}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
