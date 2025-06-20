import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, MicOff, Send, ArrowLeft, Globe, User, Moon, Sun, Loader2, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const LawyerChat = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  
  const lawyer = JSON.parse(localStorage.getItem('selectedLawyer') || '{}');

  useEffect(() => {
    // Initial lawyer greeting
    const greeting: Message = {
      id: '1',
      text: `Hello! I'm ${lawyer.name}. I've received your case details and I'm here to help you. Let's discuss your legal matter in detail.`,
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages([greeting]);
  }, [lawyer.name]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate lawyer response
    setTimeout(() => {
      const lawyerResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateLawyerResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, lawyerResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const generateLawyerResponse = (userInput: string) => {
    const responses = [
      "I understand your concern. Based on what you've shared, here are your legal options...",
      "That's a valid point. Let me explain the legal implications of this situation.",
      "I've handled similar cases before. Here's what I recommend as the next steps...",
      "This is indeed a complex matter. Let me break down the legal framework for you.",
      "Thank you for providing those details. This information will be crucial for your case."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const toggleListening = () => {
    if (!isLoading) {
      setIsListening(!isListening);
      if (!isListening) {
        setTimeout(() => {
          setIsListening(false);
        }, 3000);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <div className={`min-h-screen flex ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
    }`}>
      {/* Sidebar */}
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
              onClick={() => setIsSidebarOpen(false)}
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

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className={`border-b p-4 flex items-center justify-between ${
          isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center space-x-4">
            {!isSidebarOpen && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(true)}
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
            <Select value={language} onValueChange={setLanguage}>
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
            
            <Button variant="ghost" size="sm" onClick={() => setIsDarkMode(!isDarkMode)} className={
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

        {/* Messages */}
        <div className={`flex-1 overflow-y-auto max-w-4xl mx-auto w-full ${isMobile ? 'p-2' : 'p-4'}`}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-6 ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              {!message.isUser && (
                <div className={`rounded-2xl p-4 ${isMobile ? 'max-w-[85%]' : 'max-w-md'} ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <p className={`text-sm leading-relaxed ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>{message.text}</p>
                </div>
              )}
              {message.isUser && (
                <div className={`rounded-2xl p-4 ${isMobile ? 'max-w-[85%]' : 'max-w-md'} ${
                  isDarkMode ? 'bg-blue-600' : 'bg-black'
                }`}>
                  <p className="text-sm text-white leading-relaxed">{message.text}</p>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start mb-6">
              <div className={`rounded-2xl p-4 max-w-md ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className={`w-2 h-2 rounded-full animate-bounce ${
                      isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
                    }`} style={{ animationDelay: '0ms' }}></div>
                    <div className={`w-2 h-2 rounded-full animate-bounce ${
                      isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
                    }`} style={{ animationDelay: '150ms' }}></div>
                    <div className={`w-2 h-2 rounded-full animate-bounce ${
                      isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
                    }`} style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Lawyer is typing...
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`border-t max-w-4xl mx-auto w-full ${isMobile ? 'p-2' : 'p-4'} ${
          isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className={`flex items-center rounded-full ${isMobile ? 'px-3 py-2 space-x-2' : 'px-4 py-3 space-x-3'} ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
          }`}>
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isListening ? "Listening..." : "Type your message to the lawyer..."}
              disabled={isLoading || isListening}
              className={`flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ${
                isDarkMode ? 'text-white placeholder-gray-400' : 'text-black placeholder-gray-500'
              } ${isListening ? 'placeholder-red-500' : ''}`}
            />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleListening}
              disabled={isLoading}
              className={`${isListening ? 'text-red-500' : isDarkMode ? 'text-gray-400' : 'text-gray-500'} hover:bg-transparent`}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            
            <Button 
              onClick={handleSendMessage} 
              size="sm"
              disabled={isLoading || !inputText.trim() || isListening}
              className={`rounded-full text-white ${
                isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-black hover:bg-gray-800'
              } ${isMobile ? 'p-1.5' : 'p-2'} disabled:opacity-50`}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {isListening && (
            <div className="mt-2 text-center">
              <div className="animate-pulse text-red-500 font-medium">
                🎙 Listening...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LawyerChat;
