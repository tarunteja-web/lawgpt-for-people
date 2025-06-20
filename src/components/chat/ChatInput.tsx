
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChatInputProps {
  inputText: string;
  isListening: boolean;
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
  translations,
  onInputChange,
  onSendMessage,
  onToggleListening
}) => {
  const isMobile = useIsMobile();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="bg-gray-900 border-t border-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end space-x-4">
          <div className="flex-1 relative">
            <Input
              value={inputText}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message LawGPT..."
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 pr-12 min-h-[48px] resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ outline: 'none', boxShadow: 'none' }}
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white p-2"
            >
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
