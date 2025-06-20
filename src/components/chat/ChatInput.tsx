
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
    <div className={`border-t max-w-4xl mx-auto w-full ${isMobile ? 'p-2' : 'p-4'} ${
      isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className={`flex items-center rounded-full ${isMobile ? 'px-3 py-2 space-x-2' : 'px-4 py-3 space-x-3'} ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <Input
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={translations.typeMessage}
          className={`flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ${
            isDarkMode ? 'text-white placeholder-gray-400' : 'text-black placeholder-gray-500'
          }`}
        />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleListening}
          className={`${isListening ? 'text-red-500' : isDarkMode ? 'text-gray-400' : 'text-gray-500'} hover:bg-transparent`}
        >
          {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
        
        <Button 
          onClick={onSendMessage} 
          size="sm"
          className={`rounded-full text-white ${
            isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-black hover:bg-gray-800'
          } ${isMobile ? 'p-1.5' : 'p-2'}`}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      
      {isListening && (
        <div className="mt-2 text-center">
          <div className="animate-pulse text-red-500 font-medium">
            🎙 {translations.listening}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInput;
