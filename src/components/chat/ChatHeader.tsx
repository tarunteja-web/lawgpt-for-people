
import React from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChatHeaderProps {
  isAnonymous: boolean;
  language: string;
  isDarkMode: boolean;
  onLanguageChange: (value: string) => void;
  onToggleDarkMode: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  isAnonymous,
  language,
  isDarkMode,
  onLanguageChange,
  onToggleDarkMode
}) => {
  const isMobile = useIsMobile();

  return (
    <header className="bg-gray-900 p-4 flex items-center justify-between border-b border-gray-800">
      <div className="flex items-center space-x-4">
        <h1 className="font-semibold text-white text-lg">LawGPT</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost" 
          size="sm"
          className="text-gray-400 hover:text-white hover:bg-gray-800 px-3 py-1.5 rounded-lg text-sm"
        >
          {language === 'hi' ? 'हि' : language === 'te' ? 'తె' : 'hi'}
        </Button>
      </div>
    </header>
  );
};

export default ChatHeader;
