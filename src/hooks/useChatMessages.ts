
import { Message } from '@/types/chat';
import { getTranslations } from '@/utils/translations';
import { supabase } from '@/integrations/supabase/client';

interface UseChatMessagesProps {
  messages: Message[];
  setMessages: (updater: (prev: Message[]) => Message[]) => void;
  language: string;
  selectedIssue: string;
  currentSessionId: string | null;
  setIsLoading: (loading: boolean) => void;
  getNextQuestion: () => string | null;
  isInQuestioningPhase: () => boolean;
}

export const useChatMessages = ({
  messages,
  setMessages,
  language,
  selectedIssue,
  currentSessionId,
  setIsLoading,
  getNextQuestion,
  isInQuestioningPhase
}: UseChatMessagesProps) => {
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

  const handleSendMessage = async (inputText: string, setInputText: (text: string) => void) => {
    if (!inputText.trim()) return;

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
      let aiResponse;
      
      // Check if we're still in questioning phase
      if (isInQuestioningPhase()) {
        const nextQuestion = getNextQuestion();
        if (nextQuestion) {
          aiResponse = `Thank you for that information. Next question:\n\n${nextQuestion}`;
        } else {
          aiResponse = "Thank you for providing all the information. Now I can help you with your legal matter. What specific question do you have about your case?";
        }
      } else {
        // Normal AI response for legal questions
        aiResponse = await generateAIResponse(inputText);
      }
      
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

  return { handleSendMessage };
};
