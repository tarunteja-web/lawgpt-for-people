
import React from 'react';
import ChatHeader from '@/components/chat/ChatHeader';
import MessageList from '@/components/chat/MessageList';
import ActionButtons from '@/components/chat/ActionButtons';
import ChatInput from '@/components/chat/ChatInput';
import { useChat } from '@/hooks/useChat';
import { getTranslations } from '@/utils/translations';
import { useIsMobile } from '@/hooks/use-mobile';

const Chat = () => {
  const {
    messages,
    inputText,
    setInputText,
    isAnonymous,
    isListening,
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
  const isMobile = useIsMobile();

  return (
    <div className={`min-h-screen flex flex-col ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
    } ${isMobile ? 'relative' : ''}`}>
      <ChatHeader
        isAnonymous={isAnonymous}
        language={language}
        isDarkMode={isDarkMode}
        onLanguageChange={setLanguage}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      <div className={`flex-1 flex flex-col ${isMobile ? 'pb-32' : 'pb-40'}`}>
        <MessageList messages={messages} isDarkMode={isDarkMode} />
        
        <ActionButtons
          isAnonymous={isAnonymous}
          isDarkMode={isDarkMode}
          translations={t}
          onToggleAnonymous={toggleAnonymous}
          onActionClick={handleActionClick}
        />
      </div>

      <div className={`${isMobile ? 'fixed bottom-0 left-0 right-0 z-50' : 'sticky bottom-0'} ${
        isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      } ${isMobile ? 'border-t' : ''}`}>
        <ChatInput
          inputText={inputText}
          isListening={isListening}
          isDarkMode={isDarkMode}
          translations={t}
          onInputChange={setInputText}
          onSendMessage={handleSendMessage}
          onToggleListening={toggleListening}
        />
      </div>
    </div>
  );
};

export default Chat;
