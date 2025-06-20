
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Globe, User, Moon, Sun, LogIn, UserPlus } from 'lucide-react';
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
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const t = getTranslations(language);

  // Check if user is authenticated (simple check for now)
  const isAuthenticated = localStorage.getItem('userName');

  useEffect(() => {
    localStorage.setItem('selectedLanguage', language);
  }, [language]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/login');
  };

  return (
    <header className={`border-b p-3 sm:p-4 flex items-center justify-between ${
      isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <h1 className={`font-bold text-lg sm:text-xl ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>LawGPT</h1>
        {isAnonymous && <Shield className={`h-4 w-4 sm:h-5 sm:w-5 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-400'
        }`} />}
      </div>
      
      <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger className={`w-12 sm:w-16 md:w-20 ${
            isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
          }`}>
            <div className="flex items-center space-x-1">
              <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent className={isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}>
            <SelectItem value="en" className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>EN</SelectItem>
            <SelectItem value="hi" className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>हि</SelectItem>
            <SelectItem value="te" className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>తె</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="ghost" size="sm" onClick={onToggleDarkMode} className={`p-1 sm:p-2 ${
          isDarkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'
        }`}>
          {isDarkMode ? <Sun className="h-3 w-3 sm:h-4 sm:w-4" /> : <Moon className="h-3 w-3 sm:h-4 sm:w-4" />}
        </Button>
        
        {!isAuthenticated ? (
          // Show auth buttons when not authenticated
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogin}
              className={`flex items-center space-x-1 p-1 sm:p-2 text-xs sm:text-sm ${
                isDarkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'
              }`}
            >
              <LogIn className="h-3 w-3 sm:h-4 sm:w-4" />
              {!isMobile && <span>{t.signIn}</span>}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignUp}
              className={`flex items-center space-x-1 p-1 sm:p-2 text-xs sm:text-sm ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700' 
                  : 'border-gray-300 bg-white text-black hover:bg-gray-50'
              }`}
            >
              <UserPlus className="h-3 w-3 sm:h-4 sm:w-4" />
              {!isMobile && <span>Sign Up</span>}
            </Button>
          </div>
        ) : (
          // Show user button when authenticated
          <Button variant="ghost" size="sm" className={`flex items-center space-x-2 p-1 sm:p-2 ${
            isDarkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'
          }`}>
            <User className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        )}
      </div>
    </header>
  );
};

export default ChatHeader;
