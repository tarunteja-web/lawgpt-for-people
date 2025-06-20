
import React, { useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Message } from '@/types/chat';

interface MessageListProps {
  messages: Message[];
  isDarkMode: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isDarkMode }) => {
  const isMobile = useIsMobile();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`flex-1 overflow-y-auto ${
      isMobile ? 'px-3 py-2' : 'px-6 py-4'
    } max-w-4xl mx-auto w-full`}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${isMobile ? 'mb-4' : 'mb-6'} ${
            message.isUser ? 'justify-end' : 'justify-start'
          }`}
        >
          {!message.isUser && (
            <div className={`rounded-2xl ${isMobile ? 'p-3' : 'p-4'} ${
              isMobile ? 'max-w-[80%]' : 'max-w-md'
            } ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} leading-relaxed ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>{message.text}</p>
            </div>
          )}
          {message.isUser && (
            <div className={`rounded-2xl ${isMobile ? 'p-3' : 'p-4'} ${
              isMobile ? 'max-w-[80%]' : 'max-w-md'
            } ${isDarkMode ? 'bg-blue-600' : 'bg-black'}`}>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-white leading-relaxed`}>
                {message.text}
              </p>
            </div>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
