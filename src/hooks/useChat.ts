
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Message } from '@/types/chat';
import { getTranslations } from '@/utils/translations';
import { supabase } from '@/integrations/supabase/client';

export const useChat = () => {
  const navigate = useNavigate();
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
  
  const userName = localStorage.getItem('userName') || 'User';
  const selectedIssue = localStorage.getItem('selectedLegalIssue') || 'General';

  useEffect(() => {
    localStorage.setItem('selectedLanguage', language);
  }, [language]);

  useEffect(() => {
    const initializeSession = async () => {
      const t = getTranslations(language);
      const greeting = t.initialGreeting.replace('{issue}', selectedIssue);
      
      const initialMessage: Message = {
        id: '1',
        text: greeting,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages([initialMessage]);

      // Create a new chat session in Supabase
      try {
        const { data: session, error: sessionError } = await supabase.auth.getSession();
        const userId = session?.session?.user?.id || null;

        const { data, error } = await supabase
          .from('chat_sessions')
          .insert({
            user_id: userId,
            legal_issue: selectedIssue,
            language: language,
            is_anonymous: isAnonymous
          })
          .select()
          .single();

        if (error) {
          console.error('Error creating chat session:', error);
        } else {
          setCurrentSessionId(data.id);
          console.log('Chat session created:', data.id);

          // Store the initial AI greeting message
          await supabase
            .from('chat_messages')
            .insert({
              session_id: data.id,
              sender: 'ai',
              content: greeting
            });
        }
      } catch (error) {
        console.error('Error initializing chat session:', error);
      }
    };

    initializeSession();
  }, [selectedIssue, language, isAnonymous]);

  const storeMessage = async (message: Message, sessionId: string) => {
    try {
      await supabase
        .from('chat_messages')
        .insert({
          session_id: sessionId,
          sender: message.isUser ? 'user' : 'ai',
          content: message.text
        });
    } catch (error) {
      console.error('Error storing message:', error);
    }
  };

  const generateAIResponse = async (userInput: string) => {
    try {
      console.log('Calling AI API with:', { userInput, selectedIssue, language });
      
      const { data, error } = await supabase.functions.invoke('chat-ai', {
        body: {
          message: userInput,
          legalIssue: selectedIssue,
          language: language,
          messageHistory: messages
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('AI API response:', data);
      return data.response;
    } catch (error) {
      console.error('Error calling AI API:', error);
      const t = getTranslations(language);
      return t.generalResponse || "I apologize, but I'm having trouble processing your request right now. Please try again.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Store user message in Supabase
    if (currentSessionId) {
      await storeMessage(userMessage, currentSessionId);
    }

    setInputText('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(inputText);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);

      // Store AI response in Supabase
      if (currentSessionId) {
        await storeMessage(aiMessage, currentSessionId);
      }
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm experiencing technical difficulties. Please try again.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);

      // Store error message in Supabase
      if (currentSessionId) {
        await storeMessage(errorMessage, currentSessionId);
      }
    } finally {
      setIsLoading(false);
    }
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
        navigate('/call');
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
