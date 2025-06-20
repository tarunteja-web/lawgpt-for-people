
import { useChatState } from './useChatState';
import { useChatSession } from './useChatSession';
import { useChatMessages } from './useChatMessages';
import { useChatActions } from './useChatActions';

export const useChat = () => {
  const {
    messages,
    setMessages,
    inputText,
    setInputText,
    isAnonymous,
    setIsAnonymous,
    isListening,
    setIsListening,
    isLoading,
    setIsLoading,
    language,
    setLanguage,
    isDarkMode,
    setIsDarkMode,
    savedMessages,
    setSavedMessages,
    currentSessionId,
    setCurrentSessionId
  } = useChatState();

  const { selectedIssue } = useChatSession({
    language,
    isAnonymous,
    setMessages,
    setCurrentSessionId
  });

  const { handleSendMessage: handleSendMessageBase } = useChatMessages({
    messages,
    setMessages,
    language,
    selectedIssue,
    currentSessionId,
    setIsLoading
  });

  const {
    toggleAnonymous,
    toggleListening,
    handleActionClick
  } = useChatActions({
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

  const handleSendMessage = () => {
    handleSendMessageBase(inputText, setInputText);
  };

  return {
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
  };
};
