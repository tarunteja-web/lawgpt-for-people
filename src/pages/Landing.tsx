
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Scale, MessageCircle, Users, Shield, Globe, Moon, Sun } from 'lucide-react';
import { getTranslations } from '@/utils/translations';

const Landing = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'en';
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const t = getTranslations(language);

  useEffect(() => {
    localStorage.setItem('selectedLanguage', language);
  }, [language]);

  const sampleQuestions = [
    "What are my rights in a workplace dispute?",
    "How do I handle a landlord-tenant issue?",
    "What should I do after a car accident?",
    "How can I protect my intellectual property?"
  ];

  const features = [
    {
      icon: Scale,
      title: "Expert Legal Guidance",
      description: "Get instant access to legal expertise powered by AI"
    },
    {
      icon: MessageCircle,
      title: "24/7 Legal Chat",
      description: "Ask legal questions anytime, anywhere"
    },
    {
      icon: Users,
      title: "Connect with Lawyers",
      description: "Direct access to qualified legal professionals"
    },
    {
      icon: Shield,
      title: "Secure & Confidential",
      description: "Your legal matters are protected and private"
    }
  ];

  const handleGetStarted = () => {
    navigate('/chat');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSampleQuestion = (question: string) => {
    // Store the question and navigate to chat
    localStorage.setItem('pendingQuestion', question);
    navigate('/chat');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
    }`}>
      {/* Header */}
      <header className={`border-b p-4 flex items-center justify-between ${
        isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
      }`}>
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">LawGPT</h1>
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {t.legalAIAssistant}
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={isDarkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleLogin}
            className={isDarkMode ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700' : 'border-gray-300 bg-white text-black hover:bg-gray-50'}
          >
            {t.signIn}
          </Button>
          
          <Button
            onClick={handleGetStarted}
            className="bg-black text-white hover:bg-gray-800"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-16 text-center max-w-6xl mx-auto">
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r ${
            isDarkMode 
              ? 'from-white to-gray-400' 
              : 'from-black to-gray-600'
          } bg-clip-text text-transparent`}>
            Your AI Legal Assistant
          </h1>
          <p className={`text-xl md:text-2xl mb-8 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Get instant legal guidance, connect with qualified lawyers, and navigate complex legal matters with confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg"
            >
              Start Legal Chat
              <MessageCircle className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => navigate('/marketplace')}
              variant="outline"
              size="lg"
              className={`px-8 py-4 text-lg ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700' 
                  : 'border-gray-300 bg-white text-black hover:bg-gray-50'
              }`}
            >
              Find Lawyers
              <Users className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Sample Questions */}
        <div className="mb-16">
          <h2 className={`text-2xl font-semibold mb-6 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}>
            Try asking about...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {sampleQuestions.map((question, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-600 hover:bg-gray-700' 
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => handleSampleQuestion(question)}
              >
                <CardContent className="p-4">
                  <p className={`text-left ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    "{question}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <feature.icon className={`h-8 w-8 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`} />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}>
                {feature.title}
              </h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <Card className={`max-w-2xl mx-auto ${
          isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-200'
        }`}>
          <CardContent className="p-8 text-center">
            <h2 className={`text-3xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>
              Ready to get legal help?
            </h2>
            <p className={`text-lg mb-6 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Join thousands of users who trust LawGPT for their legal needs
            </p>
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Landing;
