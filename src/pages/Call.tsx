
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, MessageCircle, Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getTranslations } from '@/utils/translations';

const Call = () => {
  const navigate = useNavigate();
  const language = localStorage.getItem('selectedLanguage') || 'en';
  const t = getTranslations(language);

  const handleCallTeam = () => {
    console.log('Calling team...');
    alert('Calling our legal team...');
  };

  const handleChatTeam = () => {
    console.log('Opening chat with team...');
    alert('Opening chat with our team...');
  };

  const handleCallPolice = () => {
    console.log('Calling police...');
    alert('Emergency: Calling police (100)...');
  };

  const handleBackToChat = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <Button
            onClick={handleBackToChat}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Chat
          </Button>
          <h1 className="text-xl font-semibold text-black">Contact Options</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gradient-to-br from-blue-50 to-white p-4">
        <div className="container mx-auto max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How can we help you?
            </h2>
            <p className="text-gray-600">
              Choose the best way to get in touch with us
            </p>
          </div>

          <Card className="bg-white border-gray-300">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-4">
                <Button
                  onClick={handleCallTeam}
                  className="w-full bg-black text-white hover:bg-gray-800 flex items-center gap-3 justify-start py-6 text-lg"
                >
                  <Phone className="h-6 w-6" />
                  <div className="text-left">
                    <div className="font-semibold">{t.callTeam}</div>
                    <div className="text-sm opacity-80">Speak directly with our legal experts</div>
                  </div>
                </Button>

                <Button
                  onClick={handleChatTeam}
                  className="w-full bg-black text-white hover:bg-gray-800 flex items-center gap-3 justify-start py-6 text-lg"
                >
                  <MessageCircle className="h-6 w-6" />
                  <div className="text-left">
                    <div className="font-semibold">{t.chatTeam}</div>
                    <div className="text-sm opacity-80">Start a live chat conversation</div>
                  </div>
                </Button>

                <Button
                  onClick={handleCallPolice}
                  className="w-full bg-red-600 text-white hover:bg-red-700 flex items-center gap-3 justify-start py-6 text-lg border-2 border-red-200"
                >
                  <Shield className="h-6 w-6" />
                  <div className="text-left">
                    <div className="font-semibold">{t.callPolice}</div>
                    <div className="text-sm opacity-80">For immediate emergency assistance</div>
                  </div>
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  Available 24/7 for your legal needs
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Call;
