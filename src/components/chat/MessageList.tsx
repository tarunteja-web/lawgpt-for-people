
import React, { useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const isMobile = useIsMobile();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`flex-1 overflow-y-auto max-w-4xl mx-auto w-full ${isMobile ? 'p-2' : 'p-4'}`}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex mb-6 ${message.isUser ? 'justify-end' : 'justify-start'}`}
        >
          {!message.isUser && (
            <div className={`bg-gray-100 rounded-2xl p-4 ${isMobile ? 'max-w-[85%]' : 'max-w-md'}`}>
              <p className="text-sm text-gray-700 leading-relaxed">{message.text}</p>
            </div>
          )}
          {message.isUser && (
            <div className={`bg-black rounded-2xl p-4 ${isMobile ? 'max-w-[85%]' : 'max-w-md'}`}>
              <p className="text-sm text-white leading-relaxed">{message.text}</p>
            </div>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
