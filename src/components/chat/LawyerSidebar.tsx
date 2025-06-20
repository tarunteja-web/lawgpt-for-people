
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, MessageCircle } from 'lucide-react';
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

  // Mock user data - in real app this would come from user context/auth
  const user = {
    name: "John Doe",
    email: "john.doe@email.com",
    avatar: "/placeholder.svg",
    joinedDate: "Jan 2024"
  };

  // Mock chat history - in real app this would come from API
  const chatHistory = [
    {
      id: 1,
      lawyerName: "Adv. Priya Sharma",
      specialization: "Family Law",
      lastMessage: "Thank you for the consultation. I'll prepare the documents.",
      date: "2024-06-19",
      status: "completed"
    },
    {
      id: 2,
      lawyerName: "Adv. Rajesh Kumar",
      specialization: "Criminal Law",
      lastMessage: "We need to gather more evidence for your case.",
      date: "2024-06-18",
      status: "ongoing"
    },
    {
      id: 3,
      lawyerName: "Adv. Meera Patel",
      specialization: "Corporate Law",
      lastMessage: "The contract review is complete.",
      date: "2024-06-15",
      status: "completed"
    }
  ];

  return (
    <div className={`${
      isSidebarOpen ? (isMobile ? 'w-screen' : 'w-80') : 'w-0'
    } h-full overflow-hidden border-r ${
      isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className={`${isMobile ? 'p-4' : 'p-6'} h-full overflow-y-auto`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className={`text-base sm:text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>My Profile</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className={`p-2 ${isDarkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'}`}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* User Profile */}
        <div className={`p-3 sm:p-4 rounded-lg border mb-4 sm:mb-6 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}>
          {/* Avatar and Basic Info */}
          <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
            <Avatar className={`${isMobile ? 'h-12 w-12' : 'h-16 w-16'}`}>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className={`${isMobile ? 'text-base' : 'text-lg'} font-bold ${
                isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
              }`}>
                {user.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h3 className={`font-bold ${isMobile ? 'text-base' : 'text-lg'} truncate ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>{user.name}</h3>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} truncate ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>{user.email}</p>
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between">
              <span className={`${isMobile ? 'text-xs' : 'text-sm'} ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Member since:</span>
              <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>{user.joinedDate}</span>
            </div>
            
            <div className="flex justify-between">
              <span className={`${isMobile ? 'text-xs' : 'text-sm'} ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>Total consultations:</span>
              <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>{chatHistory.length}</span>
            </div>
          </div>
        </div>

        {/* Chat History */}
        <div className={`rounded-lg border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className={`font-semibold ${isMobile ? 'text-sm' : 'text-base'} ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>Chat History</h3>
          </div>
          
          <div>
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                className={`p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors`}
              >
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <MessageCircle className={`h-3 w-3 sm:h-4 sm:w-4 mt-1 ${
                    chat.status === 'ongoing' ? 'text-green-500' : 'text-gray-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium truncate ${
                        isDarkMode ? 'text-white' : 'text-black'
                      }`}>{chat.lawyerName}</h4>
                      <span className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>{chat.date}</span>
                    </div>
                    <p className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>{chat.specialization}</p>
                    <p className={`text-xs mt-1 truncate ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>{chat.lastMessage}</p>
                    <div className="flex items-center mt-2">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        chat.status === 'ongoing' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                      }`}>
                        {chat.status}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerSidebar;
