
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
      
      // Create the comprehensive initial message with greeting + questions
      const initialGreeting = `${t.initialGreeting.replace('{issue}', selectedIssue)}

📋 **Let me gather some details to help you better with your ${selectedIssue} case:**

**Personal Information:**
• What is your full name?
• What is your age?
• What is your current location/city?

**Your ${selectedIssue} Case Details:**
• What specific incident or situation occurred?
• When did this happen (exact date/timeframe)?
• Who are the other parties involved?
• What documents do you have related to this matter?
• Have you taken any legal action yet?
• What outcome are you seeking?
• What is your budget for legal assistance?

Please provide these details so I can give you the most relevant legal guidance for your situation.`;
      
      const initialMessage: Message = {
        id: '1',
        text: initialGreeting,
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

          // Store the initial AI greeting message with questions
          await supabase
            .from('chat_messages')
            .insert({
              session_id: data.id,
              sender: 'ai',
              content: initialGreeting
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
