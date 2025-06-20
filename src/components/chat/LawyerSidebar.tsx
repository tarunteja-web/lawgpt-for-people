
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';

interface LawyerSidebarProps {
  lawyer: any;
  isSidebarOpen: boolean;
  isDarkMode: boolean;
  onToggleSidebar: () => void;
}

const LawyerSidebar: React.FC<LawyerSidebarProps> = ({
  lawyer,
  isSidebarOpen,
  isDarkMode,
  onToggleSidebar
}) => {
  const isMobile = useIsMobile();

  return (
    <div className={`${
      isSidebarOpen ? (isMobile ? 'w-full' : 'w-80') : 'w-0'
    } transition-all duration-300 overflow-hidden border-r ${
      isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="p-6">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>Lawyer Profile</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className={isDarkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Lawyer Profile */}
        <div className={`p-4 rounded-lg border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}>
          {/* Status Indicator */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Active in consultation</span>
            </div>
          </div>

          {/* Avatar and Basic Info */}
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={lawyer.image} alt={lawyer.name} />
              <AvatarFallback className={`text-lg font-bold ${
                isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
              }`}>
                {lawyer.name?.charAt(0) || 'L'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className={`font-bold text-lg ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>{lawyer.name}</h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>{lawyer.specialization}</p>
            </div>
          </div>

          {/* Lawyer Details */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Experience:</span>
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>{lawyer.experience}</span>
            </div>
            
            <div className="flex justify-between">
              <span className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Rating:</span>
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>{lawyer.rating} ⭐</span>
            </div>
            
            <div className="flex justify-between">
              <span className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Language:</span>
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>{lawyer.language}</span>
            </div>
            
            <div className="flex justify-between">
              <span className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Fee:</span>
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>₹{lawyer.fee}</span>
            </div>
          </div>

          {/* Session Info */}
          <div className={`mt-4 pt-4 border-t ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Session Time:</span>
              <span className={`text-sm font-medium text-green-500`}>
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerSidebar;
