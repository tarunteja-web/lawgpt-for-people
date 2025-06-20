
import React, { useEffect } from 'react';
import ChatHeader from '@/components/chat/ChatHeader';
import MessageList from '@/components/chat/MessageList';
import ActionButtons from '@/components/chat/ActionButtons';
import ChatInput from '@/components/chat/ChatInput';
import { useChat } from '@/hooks/useChat';
import { getTranslations } from '@/utils/translations';

const Chat = () => {
  const {
    messages,
    inputText,
    setInputText,
    isAnonymous,
    isListening,
    isLoading,
    language,
    setLanguage,
    isDarkMode,
    setIsDarkMode,
    handleSendMessage,
    toggleAnonymous,
    toggleListening,
    handleActionClick
  } = useChat();

  const t = getTranslations(language);

  // Handle pending question from landing page
  useEffect(() => {
    const pendingQuestion = localStorage.getItem('pendingQuestion');
    if (pendingQuestion) {
      setInputText(pendingQuestion);
      localStorage.removeItem('pendingQuestion');
    }
  }, [setInputText]);

  return (
    <div className={`min-h-screen flex flex-col ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
    }`}>
      <ChatHeader
        isAnonymous={isAnonymous}
        language={language}
        isDarkMode={isDarkMode}
        onLanguageChange={setLanguage}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <MessageList 
          messages={messages} 
          isDarkMode={isDarkMode} 
          isLoading={isLoading}
        />

        <div className="mt-auto">
          <ActionButtons
            isAnonymous={isAnonymous}
            isDarkMode={isDarkMode}
            translations={t}
            onToggleAnonymous={toggleAnonymous}
            onActionClick={handleActionClick}
            isLawyerChat={false}
          />

          <ChatInput
            inputText={inputText}
            isListening={isListening}
            isLoading={isLoading}
            isDarkMode={isDarkMode}
            translations={t}
            language={language}
            onInputChange={setInputText}
            onSendMessage={handleSendMessage}
            onToggleListening={toggleListening}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
