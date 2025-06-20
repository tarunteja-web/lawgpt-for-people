
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, MicOff, Send } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChatInputProps {
  inputText: string;
  isListening: boolean;
  isDarkMode: boolean;
  translations: {
    typeMessage: string;
    listening: string;
  };
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onToggleListening: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputText,
  isListening,
  isDarkMode,
  translations,
  onInputChange,
  onSendMessage,
  onToggleListening
}) => {
  const isMobile = useIsMobile();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div className={`${isMobile ? 'p-3' : 'p-4'} w-full ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className={`max-w-4xl mx-auto`}>
        <div className={`flex items-center rounded-full ${
          isMobile ? 'px-3 py-2 space-x-2' : 'px-4 py-3 space-x-3'
        } ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <Input
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={translations.typeMessage}
            className={`flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ${
              isDarkMode ? 'text-white placeholder-gray-400' : 'text-black placeholder-gray-500'
            } ${isMobile ? 'text-sm' : 'text-base'}`}
          />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleListening}
            className={`${isListening ? 'text-red-500' : isDarkMode ? 'text-gray-400' : 'text-gray-500'} hover:bg-transparent ${
              isMobile ? 'h-8 w-8 p-0' : 'h-10 w-10'
            }`}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          
          <Button 
            onClick={onSendMessage} 
            size="sm"
            className={`rounded-full text-white ${
              isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-black hover:bg-gray-800'
            } ${isMobile ? 'h-8 w-8 p-0' : 'h-10 w-10 p-0'}`}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {isListening && (
          <div className={`${isMobile ? 'mt-2' : 'mt-3'} text-center`}>
            <div className={`animate-pulse text-red-500 font-medium ${
              isMobile ? 'text-sm' : 'text-base'
            }`}>
              🎙 {translations.listening}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInput;
