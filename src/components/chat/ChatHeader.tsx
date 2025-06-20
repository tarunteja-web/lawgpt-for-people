
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Globe, User, Moon, Sun } from 'lucide-react';
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
    <header className={`bg-white border-b border-gray-200 p-4 flex items-center justify-between ${isMobile ? 'px-2' : ''}`}>
      <div className="flex items-center space-x-4">
        <h1 className={`font-bold text-black ${isMobile ? 'text-lg' : 'text-xl'}`}>LawGPT</h1>
        {!isMobile && <span className="text-sm text-gray-500">Legal AI Assistant</span>}
        {isAnonymous && <Shield className="h-5 w-5 text-gray-400" />}
      </div>
      
      <div className={`flex items-center ${isMobile ? 'space-x-2' : 'space-x-4'}`}>
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger className={`border-gray-300 ${isMobile ? 'w-16' : 'w-20'}`}>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-300">
            <SelectItem value="en">EN</SelectItem>
            <SelectItem value="hi">हि</SelectItem>
            <SelectItem value="te">తె</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="ghost" size="sm" onClick={onToggleDarkMode} className="text-black hover:bg-gray-100">
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        
        <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-black hover:bg-gray-100">
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default ChatHeader;
