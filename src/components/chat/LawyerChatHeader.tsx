
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Globe, User, Moon, Sun, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';

interface LawyerChatHeaderProps {
  lawyer: any;
  language: string;
  isDarkMode: boolean;
  isSidebarOpen: boolean;
  onLanguageChange: (value: string) => void;
  onToggleDarkMode: () => void;
  onToggleSidebar: () => void;
}

const LawyerChatHeader: React.FC<LawyerChatHeaderProps> = ({
  lawyer,
  language,
  isDarkMode,
  isSidebarOpen,
  onLanguageChange,
  onToggleDarkMode,
  onToggleSidebar
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <header className={`border-b p-4 flex items-center justify-between ${
      isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center space-x-4">
        {!isSidebarOpen && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className={isDarkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'}
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}
        
        <Button variant="ghost" size="sm" onClick={() => navigate('/marketplace')} className={
          isDarkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'
        }>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <div>
          <h1 className={`font-bold ${isMobile ? 'text-lg' : 'text-xl'} ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>Chat with {lawyer.name}</h1>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>{lawyer.specialization} • {lawyer.language}</p>
        </div>
      </div>
      
      <div className={`flex items-center ${isMobile ? 'space-x-2' : 'space-x-4'}`}>
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
        
        <Button variant="ghost" size="sm" className={`flex items-center space-x-2 ${
          isDarkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'
        }`}>
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default LawyerChatHeader;
