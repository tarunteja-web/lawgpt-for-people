
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MessageCircle, Shield, ArrowLeft, Clock, Users, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getTranslations } from '@/utils/translations';

const Call = () => {
  const navigate = useNavigate();
  const language = localStorage.getItem('selectedLanguage') || 'en';
  const isDarkMode = localStorage.getItem('isDarkMode') === 'true';
  const t = getTranslations(language);

  const handleCallTeam = () => {
    console.log('Calling team...');
    alert('Connecting you to our legal experts...');
  };

  const handleChatTeam = () => {
    console.log('Opening chat with team...');
    alert('Starting live chat with our support team...');
  };

  const handleCallPolice = () => {
    console.log('Calling police...');
    alert('Emergency: Calling police (100)...');
  };

  const handleBackToChat = () => {
    navigate('/chat');
  };

  return (
    <div className={`min-h-screen flex flex-col ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
    }`}>
      {/* Header */}
      <div className={`border-b p-4 sticky top-0 z-10 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <Button
            onClick={handleBackToChat}
            variant="ghost"
            size="sm"
            className={`flex items-center gap-2 ${
              isDarkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-black'
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Chat
          </Button>
          <h1 className={`text-xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Get Legal Help Now</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              How Would You Like to Connect?
            </h2>
            <p className={`text-xl mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Choose your preferred method to get immediate legal assistance
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className={`flex items-center justify-center gap-1 mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <Clock className="h-4 w-4" />
                  <span className="font-semibold">24/7</span>
                </div>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Available</p>
              </div>
              <div className="text-center">
                <div className={`flex items-center justify-center gap-1 mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <Users className="h-4 w-4" />
                  <span className="font-semibold">500+</span>
                </div>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Legal Experts</p>
              </div>
              <div className="text-center">
                <div className={`flex items-center justify-center gap-1 mb-1 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <Star className="h-4 w-4" />
                  <span className="font-semibold">4.9/5</span>
                </div>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Client Rating</p>
              </div>
            </div>
          </div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Call Team Card */}
            <Card className={`shadow-lg hover:shadow-xl transition-all duration-300 border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <Phone className={`h-8 w-8 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`} />
                </div>
                <CardTitle className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Call Our Team</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className={`mb-6 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Speak directly with our experienced legal professionals. Get immediate answers to your questions.
                </p>
                <ul className={`text-sm mb-6 space-y-2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <li>• Immediate consultation</li>
                  <li>• Expert legal advice</li>
                  <li>• Case evaluation</li>
                </ul>
                <Button
                  onClick={handleCallTeam}
                  className={`w-full py-6 text-lg font-semibold ${
                    isDarkMode 
                      ? 'bg-white text-black hover:bg-gray-100' 
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call Now - Free Consultation
                </Button>
              </CardContent>
            </Card>

            {/* Chat Team Card */}
            <Card className={`shadow-lg hover:shadow-xl transition-all duration-300 border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <MessageCircle className={`h-8 w-8 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`} />
                </div>
                <CardTitle className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Live Chat</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className={`mb-6 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Start an instant chat conversation with our support team. Quick responses guaranteed.
                </p>
                <ul className={`text-sm mb-6 space-y-2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <li>• Instant messaging</li>
                  <li>• Document sharing</li>
                  <li>• Chat history saved</li>
                </ul>
                <Button
                  onClick={handleChatTeam}
                  className={`w-full py-6 text-lg font-semibold ${
                    isDarkMode 
                      ? 'bg-white text-black hover:bg-gray-100' 
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Start Live Chat
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Section */}
          <Card className={`border-2 shadow-lg ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-600' 
              : 'bg-gray-50 border-gray-400'
          }`}>
            <CardContent className="p-8 text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <Shield className={`h-10 w-10 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`} />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Emergency Legal Assistance</h3>
              <p className={`text-lg mb-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                If you're facing an immediate legal emergency or safety concern, contact emergency services right away.
              </p>
              <Button
                onClick={handleCallPolice}
                className={`py-6 px-8 text-lg font-semibold ${
                  isDarkMode 
                    ? 'bg-white text-black hover:bg-gray-100' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                <Shield className="h-6 w-6 mr-3" />
                Call Emergency Services (100)
              </Button>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="text-center mt-12">
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              All consultations are confidential and protected by attorney-client privilege
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Call;
