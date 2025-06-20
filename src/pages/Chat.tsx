
import React, { useState } from 'react';
import ChatHeader from '@/components/chat/ChatHeader';
import MessageList from '@/components/chat/MessageList';
import ActionButtons from '@/components/chat/ActionButtons';
import ChatInput from '@/components/chat/ChatInput';
import CallOptions from '@/components/chat/CallOptions';
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

  const [showCallOptions, setShowCallOptions] = useState(false);
  const t = getTranslations(language);

  const handleCallAction = () => {
    setShowCallOptions(true);
  };

  const modifiedHandleActionClick = (action: string) => {
    if (action === 'call') {
      handleCallAction();
    } else {
      handleActionClick(action);
    }
  };

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
        onActionClick={modifiedHandleActionClick}
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

      {showCallOptions && (
        <CallOptions
          isDarkMode={isDarkMode}
          translations={{
            callTeam: t.callTeam || 'Call Our Team',
            chatTeam: t.chatTeam || 'Chat with Our Team',
            callPolice: t.callPolice || 'Emergency: Call Police',
            emergency: t.emergency || 'Emergency'
          }}
          onClose={() => setShowCallOptions(false)}
        />
      )}
    </div>
  );
};

export default Chat;
