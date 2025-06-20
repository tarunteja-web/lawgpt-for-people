

import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Message } from '@/types/chat';
import LawyerSidebar from '@/components/chat/LawyerSidebar';
import LawyerChatHeader from '@/components/chat/LawyerChatHeader';
import MessageList from '@/components/chat/MessageList';
import ChatInput from '@/components/chat/ChatInput';
import ActionButtons from '@/components/chat/ActionButtons';
import CallOptions from '@/components/chat/CallOptions';
import { getTranslations } from '@/utils/translations';
import { useChatActions } from '@/hooks/useChatActions';

const LawyerChat = () => {
  const isMobile = useIsMobile();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [savedMessages, setSavedMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showCallOptions, setShowCallOptions] = useState(false);
  
  const lawyer = JSON.parse(localStorage.getItem('selectedLawyer') || '{}');
  const translations = getTranslations(language);

  const { toggleAnonymous, handleActionClick } = useChatActions({
    language,
    isAnonymous,
    setIsAnonymous,
    messages,
    setMessages,
    savedMessages,
    setSavedMessages,
    isListening,
    setIsListening
  });

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

  const handleLawyerActionClick = (action: string) => {
    if (action === 'call') {
      setShowCallOptions(true);
    } else {
      handleActionClick(action);
    }
  };

  return (
    <div className={`min-h-screen w-full flex ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
    }`}>
      {/* Sidebar - positioned absolutely to not affect main layout */}
      <div className={`fixed top-0 left-0 h-full z-30 transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <LawyerSidebar
          lawyer={lawyer}
          isSidebarOpen={isSidebarOpen}
          isDarkMode={isDarkMode}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area - always takes full width */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
        !isMobile && isSidebarOpen ? 'ml-80' : 'ml-0'
      }`}>
        {/* Header */}
        <LawyerChatHeader
          lawyer={lawyer}
          language={language}
          isDarkMode={isDarkMode}
          isSidebarOpen={isSidebarOpen}
          onLanguageChange={setLanguage}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Messages - flex-1 to take available space */}
        <div className="flex-1">
          <MessageList
            messages={messages}
            isDarkMode={isDarkMode}
            isLoading={isLoading}
          />
        </div>

        {/* Action Buttons - fixed position */}
        <ActionButtons
          isAnonymous={isAnonymous}
          isDarkMode={isDarkMode}
          translations={translations}
          onToggleAnonymous={toggleAnonymous}
          onActionClick={handleLawyerActionClick}
        />

        {/* Input Area - fixed at bottom */}
        <ChatInput
          inputText={inputText}
          isListening={isListening}
          isLoading={isLoading}
          isDarkMode={isDarkMode}
          translations={{
            typeMessage: translations.typeMessage,
            listening: translations.listening
          }}
          language={language}
          onInputChange={setInputText}
          onSendMessage={handleSendMessage}
          onToggleListening={toggleListening}
        />
      </div>

      {/* Call Options Modal */}
      {showCallOptions && (
        <CallOptions
          isDarkMode={isDarkMode}
          translations={translations}
          onClose={() => setShowCallOptions(false)}
        />
      )}
    </div>
  );
};

export default LawyerChat;
