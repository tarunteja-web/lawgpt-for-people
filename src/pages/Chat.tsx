
import React from 'react';
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

      <MessageList messages={messages} isDarkMode={isDarkMode} />

      <ActionButtons
        isAnonymous={isAnonymous}
        isDarkMode={isDarkMode}
        translations={t}
        onToggleAnonymous={toggleAnonymous}
        onActionClick={handleActionClick}
      />

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
  );
};

export default Chat;
