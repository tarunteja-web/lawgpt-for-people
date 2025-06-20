
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Message } from '@/types/chat';
import { getTranslations } from '@/utils/translations';

export const useChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'en';
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [savedMessages, setSavedMessages] = useState<Message[]>([]);
  
  const userName = localStorage.getItem('userName') || 'User';
  const selectedIssue = localStorage.getItem('selectedLegalIssue') || 'General';

  useEffect(() => {
    localStorage.setItem('selectedLanguage', language);
  }, [language]);

  useEffect(() => {
    const t = getTranslations(language);
    const greeting = t.initialGreeting.replace('{issue}', selectedIssue);
    
    const initialMessage: Message = {
      id: '1',
      text: greeting,
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages([initialMessage]);
  }, [selectedIssue, language]);

  const generateAIResponse = (userInput: string, issue: string) => {
    const t = getTranslations(language);
    
    switch (issue) {
      case 'Divorce':
        return t.divorceResponse;
      case 'Property Disputes':
        return t.propertyDisputesResponse;
      case 'Criminal Defense':
        return t.criminalDefenseResponse;
      case 'Business Law':
        return t.businessLawResponse;
      case 'Employment Issues':
        return t.employmentIssuesResponse;
      case 'Personal Injury':
        return t.personalInjuryResponse;
      case 'Family Law':
        return t.familyLawResponse;
      case 'Contract Disputes':
        return t.contractDisputesResponse;
      default:
        return t.generalResponse;
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText, selectedIssue),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const toggleAnonymous = () => {
    const t = getTranslations(language);
    
    if (!isAnonymous) {
      setSavedMessages(messages);
      setMessages([{
        id: 'anon-1',
        text: t.anonymousMode,
        isUser: false,
        timestamp: new Date()
      }]);
    } else {
      setMessages(savedMessages);
    }
    setIsAnonymous(!isAnonymous);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
      }, 3000);
    }
  };

  const handleActionClick = (action: string) => {
    switch (action) {
      case 'document':
        navigate('/document-preview');
        break;
      case 'casestudy':
        navigate('/case-study');
        break;
      case 'call':
        console.log('Initiating call...');
        break;
      case 'allset':
        navigate('/marketplace');
        break;
    }
  };

  return {
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
  };
};
