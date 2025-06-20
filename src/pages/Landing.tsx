
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Scale, MessageCircle, Users, Shield, Globe, Moon, Sun, Play, Star, CheckCircle, Sparkles } from 'lucide-react';
import { getTranslations } from '@/utils/translations';

const Landing = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'en';
  });
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode for Grok style
  
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
      description: "Get instant access to legal expertise powered by advanced AI technology"
    },
    {
      icon: MessageCircle,
      title: "24/7 Legal Chat",
      description: "Ask legal questions anytime, anywhere with immediate responses"
    },
    {
      icon: Users,
      title: "Connect with Lawyers",
      description: "Direct access to qualified legal professionals when you need human expertise"
    },
    {
      icon: Shield,
      title: "Secure & Confidential",
      description: "Your legal matters are protected with bank-level security and privacy"
    }
  ];

  const useCases = [
    {
      title: "Business Law",
      description: "Contract reviews, corporate compliance, and business formation guidance",
      gradient: "from-blue-600 to-purple-600"
    },
    {
      title: "Personal Legal",
      description: "Family law, estate planning, and personal injury consultations",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      title: "Real Estate",
      description: "Property transactions, lease agreements, and zoning issues",
      gradient: "from-pink-600 to-red-600"
    }
  ];

  const stats = [
    { number: "50K+", label: "Legal Questions Answered" },
    { number: "99.9%", label: "Accuracy Rate" },
    { number: "24/7", label: "Availability" },
    { number: "1000+", label: "Verified Lawyers" }
  ];

  const handleGetStarted = () => {
    navigate('/chat');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSampleQuestion = (question: string) => {
    localStorage.setItem('pendingQuestion', question);
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <header className="border-b border-gray-800 p-4 flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            LawGPT
          </h1>
          <span className="text-sm text-gray-400">Legal AI Assistant</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={handleLogin}
            className="text-gray-300 hover:text-white hover:bg-gray-800"
          >
            Sign In
          </Button>
          
          <Button
            onClick={handleGetStarted}
            className="bg-white text-black hover:bg-gray-200 font-medium"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 py-20 text-center">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black pointer-events-none" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700 mb-8">
              <Sparkles className="h-4 w-4 text-blue-400 mr-2" />
              <span className="text-sm text-gray-300">Powered by Advanced AI</span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight">
            Get unlimited answers from LawGPT
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Navigate complex legal matters with confidence. Get instant legal guidance, connect with qualified lawyers, and access expert advice 24/7.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg font-medium rounded-xl"
            >
              Start Legal Chat
              <MessageCircle className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => navigate('/marketplace')}
              variant="outline"
              size="lg"
              className="border-gray-600 bg-transparent text-white hover:bg-gray-800 px-8 py-6 text-lg rounded-xl"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="px-4 py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Transform legal challenges into visual realities
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            From contract analysis to case research, LawGPT helps you navigate any legal situation with expert guidance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 overflow-hidden group">
                <CardContent className="p-8">
                  <div className={`w-full h-32 rounded-lg bg-gradient-to-r ${useCase.gradient} mb-6 opacity-80 group-hover:opacity-100 transition-opacity`} />
                  <h3 className="text-xl font-semibold text-white mb-3">{useCase.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Questions */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Productivity, unplugged.
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            Try asking about common legal scenarios and get instant, expert guidance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {sampleQuestions.map((question, index) => (
              <Card
                key={index}
                className="bg-gray-800/30 border-gray-700 hover:bg-gray-800/50 cursor-pointer transition-all duration-300 group"
                onClick={() => handleSampleQuestion(question)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 group-hover:bg-blue-300 transition-colors" />
                    <p className="text-gray-200 group-hover:text-white transition-colors">
                      "{question}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                  <feature.icon className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-3xl p-12 border border-gray-700">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Available anywhere.
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Access LawGPT from any device, anywhere in the world. Your legal assistant is always ready to help.
            </p>
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg font-medium rounded-xl"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-white">LawGPT</h3>
              <p className="text-gray-400">Your AI Legal Assistant</p>
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
