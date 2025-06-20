
import { useEffect } from 'react';
import { Message } from '@/types/chat';
import { getTranslations } from '@/utils/translations';
import { supabase } from '@/integrations/supabase/client';

interface UseChatSessionProps {
  language: string;
  isAnonymous: boolean;
  setMessages: (messages: Message[]) => void;
  setCurrentSessionId: (id: string | null) => void;
}

export const useChatSession = ({ 
  language, 
  isAnonymous, 
  setMessages, 
  setCurrentSessionId 
}: UseChatSessionProps) => {
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
  }, [selectedIssue, language, isAnonymous, setMessages, setCurrentSessionId]);

  return { selectedIssue };
};
