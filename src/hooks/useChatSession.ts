
import { useEffect, useState } from 'react';
import { Message } from '@/types/chat';
import { getTranslations } from '@/utils/translations';
import { supabase } from '@/integrations/supabase/client';

interface UseChatSessionProps {
  language: string;
  isAnonymous: boolean;
  setMessages: (messages: Message[]) => void;
  setCurrentSessionId: (id: string | null) => void;
}

const INITIAL_QUESTIONS = [
  "What is your full name?",
  "What is your age?", 
  "What is your current location/city?",
  "What specific incident or situation occurred?",
  "When did this happen (exact date/timeframe)?",
  "Who are the other parties involved?",
  "What documents do you have related to this matter?",
  "Have you taken any legal action yet?",
  "What outcome are you seeking?",
  "What is your budget for legal assistance?"
];

export const useChatSession = ({ 
  language, 
  isAnonymous, 
  setMessages, 
  setCurrentSessionId 
}: UseChatSessionProps) => {
  const selectedIssue = localStorage.getItem('selectedLegalIssue') || 'General';
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem('selectedLanguage', language);
  }, [language]);

  useEffect(() => {
    const initializeSession = async () => {
      const t = getTranslations(language);
      
      // Start with greeting and first question
      const greeting = t.initialGreeting.replace('{issue}', selectedIssue);
      const firstQuestion = `${greeting}\n\nTo help you better with your ${selectedIssue} case, I need to gather some information. Let's start:\n\n${INITIAL_QUESTIONS[0]}`;
      
      const initialMessage: Message = {
        id: '1',
        text: firstQuestion,
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
              content: firstQuestion
            });
        }
      } catch (error) {
        console.error('Error initializing chat session:', error);
      }
    };

    initializeSession();
  }, [selectedIssue, language, isAnonymous, setMessages, setCurrentSessionId]);

  const getNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < INITIAL_QUESTIONS.length) {
      setCurrentQuestionIndex(nextIndex);
      return INITIAL_QUESTIONS[nextIndex];
    }
    return null;
  };

  const isInQuestioningPhase = () => {
    return currentQuestionIndex < INITIAL_QUESTIONS.length;
  };

  return { 
    selectedIssue, 
    getNextQuestion, 
    isInQuestioningPhase,
    currentQuestionIndex,
    totalQuestions: INITIAL_QUESTIONS.length
  };
};
