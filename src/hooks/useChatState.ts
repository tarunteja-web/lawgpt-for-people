
import { useState } from 'react';
import { Message } from '@/types/chat';

export const useChatState = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'en';
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [savedMessages, setSavedMessages] = useState<Message[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  return {
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
  };
};
