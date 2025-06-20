
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, MessageCircle, Shield, Video } from 'lucide-react';

interface CallOptionsProps {
  isDarkMode: boolean;
  translations: {
    callTeam: string;
    chatTeam: string;
    callPolice: string;
    emergency: string;
  };
  onClose: () => void;
}

const CallOptions: React.FC<CallOptionsProps> = ({
  isDarkMode,
  translations,
  onClose
}) => {
  const handleCallTeam = () => {
    console.log('Calling team...');
    // In a real app, this would initiate a call
    alert('Calling our legal team...');
    onClose();
  };

  const handleCallLawyers = () => {
    console.log('Calling lawyers...');
    // In a real app, this would initiate a call to lawyers
    alert('Calling lawyers...');
    onClose();
  };

  const handleChatTeam = () => {
    console.log('Opening chat with team...');
    // In a real app, this would open a chat interface
    alert('Opening chat with our team...');
    onClose();
  };

  const handleVideoCallLawyers = () => {
    console.log('Starting video call with lawyers...');
    // In a real app, this would start a video call with lawyers
    alert('Starting video call with lawyers...');
    onClose();
  };

  const handleCallPolice = () => {
    console.log('Calling police...');
    // In a real app, this would call emergency services
    alert('Emergency: Calling police (100)...');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className={`w-full max-w-md ${
        isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'
      }`}>
        <CardContent className="p-6 space-y-4">
          <div className="text-center">
            <h3 className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>Contact Options</h3>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleCallTeam}
              className="w-full bg-black text-white hover:bg-gray-800 flex items-center gap-3 justify-start py-3"
            >
              <Phone className="h-5 w-5" />
              <span>{translations.callTeam || 'Call Our Team'}</span>
            </Button>

            <Button
              onClick={handleCallLawyers}
              className="w-full bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-3 justify-start py-3"
            >
              <Phone className="h-5 w-5" />
              <span>Call Lawyers</span>
            </Button>

            <Button
              onClick={handleChatTeam}
              className="w-full bg-black text-white hover:bg-gray-800 flex items-center gap-3 justify-start py-3"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{translations.chatTeam || 'Chat with Our Team'}</span>
            </Button>

            <Button
              onClick={handleVideoCallLawyers}
              className="w-full bg-green-600 text-white hover:bg-green-700 flex items-center gap-3 justify-start py-3"
            >
              <Video className="h-5 w-5" />
              <span>Video Call Lawyers</span>
            </Button>

            <Button
              onClick={handleCallPolice}
              className="w-full bg-red-600 text-white hover:bg-red-700 flex items-center gap-3 justify-start py-3"
            >
              <Shield className="h-5 w-5" />
              <span>{translations.callPolice || 'Emergency: Call Police'}</span>
            </Button>
          </div>

          <Button
            onClick={onClose}
            variant="outline"
            className={`w-full mt-4 ${
              isDarkMode 
                ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700' 
                : 'border-gray-300 bg-white text-black hover:bg-gray-50'
            }`}
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CallOptions;
