
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Globe, User, Moon, Sun, Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { getTranslations } from '@/utils/translations';

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
  const t = getTranslations(language);

  useEffect(() => {
    localStorage.setItem('selectedLanguage', language);
  }, [language]);

  return (
    <header className={`border-b ${isMobile ? 'px-3 py-3' : 'px-6 py-4'} flex items-center justify-between ${
      isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center space-x-2">
        <h1 className={`font-bold ${isMobile ? 'text-base' : 'text-xl'} ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>LawGPT</h1>
        {!isMobile && <span className={`text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>{t.legalAIAssistant}</span>}
        {isAnonymous && <Shield className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} ${
          isDarkMode ? 'text-gray-400' : 'text-gray-400'
        }`} />}
      </div>
      
      <div className={`flex items-center ${isMobile ? 'space-x-1' : 'space-x-3'}`}>
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger className={`${isMobile ? 'w-12 h-8' : 'w-20'} ${
            isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
          }`}>
            <div className="flex items-center justify-center">
              {isMobile ? (
                <SelectValue />
              ) : (
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <SelectValue />
                </div>
              )}
            </div>
          </SelectTrigger>
          <SelectContent className={`${
            isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'
          } z-50`}>
            <SelectItem value="en" className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>EN</SelectItem>
            <SelectItem value="hi" className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>हि</SelectItem>
            <SelectItem value="te" className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>తె</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          variant="ghost" 
          size={isMobile ? "sm" : "default"} 
          onClick={onToggleDarkMode} 
          className={`${isMobile ? 'h-8 w-8 p-0' : ''} ${
            isDarkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'
          }`}
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        
        <Button 
          variant="ghost" 
          size={isMobile ? "sm" : "default"} 
          className={`${isMobile ? 'h-8 w-8 p-0' : 'flex items-center space-x-2'} ${
            isDarkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'
          }`}
        >
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default ChatHeader;
