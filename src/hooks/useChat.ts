
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Message } from '@/types/chat';

export const useChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [savedMessages, setSavedMessages] = useState<Message[]>([]);
  
  const userName = localStorage.getItem('userName') || 'User';
  const selectedIssue = localStorage.getItem('selectedLegalIssue') || 'General';

  useEffect(() => {
    const greeting = `Hello! I'm here to help you with your ${selectedIssue} case. I'll need to ask you a few questions to better understand your situation.`;
    
    const initialMessage: Message = {
      id: '1',
      text: greeting,
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages([initialMessage]);
  }, [selectedIssue]);

  const generateAIResponse = (userInput: string, issue: string) => {
    if (issue === 'Divorce') {
      return "I understand you're dealing with a divorce matter. Can you tell me if this is a mutual decision or if there are contested issues?";
    }
    return "Thank you for sharing that information. Let me help you understand your legal options better.";
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
    if (!isAnonymous) {
      setSavedMessages(messages);
      setMessages([{
        id: 'anon-1',
        text: 'You are now in Anonymous Mode. Your identity is hidden.',
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
