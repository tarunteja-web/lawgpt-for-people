
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Shield, Globe, User, Moon, Sun, LogIn, UserPlus, ChevronDown } from 'lucide-react';
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
    <header className={`border-b p-4 flex items-center justify-between ${isMobile ? 'px-2' : ''} ${
      isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center space-x-4">
        <h1 className={`font-bold ${isMobile ? 'text-lg' : 'text-xl'} ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>LawGPT</h1>
        {isAnonymous && <Shield className={`h-5 w-5 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-400'
        }`} />}
      </div>
      
      <div className={`flex items-center ${isMobile ? 'space-x-2' : 'space-x-4'}`}>
        {/* Welcome Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className={`flex items-center space-x-1 ${
              isDarkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'
            }`}>
              <span>Welcome</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={`${
            isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'
          } z-50`}>
            <DropdownMenuItem className={isDarkMode ? 'text-white hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-100 focus:bg-gray-100'}>
              Getting Started Guide
            </DropdownMenuItem>
            <DropdownMenuItem className={isDarkMode ? 'text-white hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-100 focus:bg-gray-100'}>
              How to Use LawGPT
            </DropdownMenuItem>
            <DropdownMenuItem className={isDarkMode ? 'text-white hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-100 focus:bg-gray-100'}>
              Legal Resources
            </DropdownMenuItem>
            <DropdownMenuItem className={isDarkMode ? 'text-white hover:bg-gray-700 focus:bg-gray-700' : 'hover:bg-gray-100 focus:bg-gray-100'}>
              FAQ
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger className={`${isMobile ? 'w-16' : 'w-20'} ${
            isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
          }`}>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent className={isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}>
            <SelectItem value="en" className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>EN</SelectItem>
            <SelectItem value="hi" className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>हि</SelectItem>
            <SelectItem value="te" className={isDarkMode ? 'text-white hover:bg-gray-700' : ''}>తె</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="ghost" size="sm" onClick={onToggleDarkMode} className={
          isDarkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'
        }>
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        
        {!isAuthenticated ? (
          // Show auth buttons when not authenticated
          <div className={`flex items-center ${isMobile ? 'space-x-1' : 'space-x-2'}`}>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogin}
              className={`flex items-center space-x-1 ${
                isDarkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'
              }`}
            >
              <LogIn className="h-4 w-4" />
              {!isMobile && <span>{t.signIn}</span>}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignUp}
              className={`flex items-center space-x-1 ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700' 
                  : 'border-gray-300 bg-white text-black hover:bg-gray-50'
              }`}
            >
              <UserPlus className="h-4 w-4" />
              {!isMobile && <span>Sign Up</span>}
            </Button>
          </div>
        ) : (
          // Show user button when authenticated
          <Button variant="ghost" size="sm" className={`flex items-center space-x-2 ${
            isDarkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'
          }`}>
            <User className="h-4 w-4" />
          </Button>
        )}
      </div>
    </header>
  );
};

export default ChatHeader;
