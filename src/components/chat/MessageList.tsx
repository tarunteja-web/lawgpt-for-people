
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
    <div className={`flex-1 overflow-y-auto bg-gray-900 ${isMobile ? 'p-4' : 'p-8'}`}>
      <div className="max-w-4xl mx-auto">
        {messages.map((message) => (
          <div key={message.id} className="mb-8">
            {!message.isUser ? (
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">AI</span>
                </div>
                <div className="flex-1">
                  <p className="text-white text-base leading-relaxed">{message.text}</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-end">
                <div className="bg-gray-800 rounded-lg px-4 py-3 max-w-xs">
                  <p className="text-white text-sm">{message.text}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
