
import React from 'react';

interface TypingIndicatorProps {
  isDarkMode: boolean;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isDarkMode }) => {
  return (
    <div className="flex justify-start mb-6">
      <div className={`rounded-2xl p-4 max-w-md ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className={`w-2 h-2 rounded-full animate-bounce ${
              isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
            }`} style={{ animationDelay: '0ms' }}></div>
            <div className={`w-2 h-2 rounded-full animate-bounce ${
              isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
            }`} style={{ animationDelay: '150ms' }}></div>
            <div className={`w-2 h-2 rounded-full animate-bounce ${
              isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
            }`} style={{ animationDelay: '300ms' }}></div>
          </div>
          <span className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            AI is thinking...
          </span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
