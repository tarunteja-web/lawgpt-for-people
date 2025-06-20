
import { useNavigate } from 'react-router-dom';
import { Message } from '@/types/chat';
import { getTranslations } from '@/utils/translations';

interface UseChatActionsProps {
  language: string;
  isAnonymous: boolean;
  setIsAnonymous: (anonymous: boolean) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  savedMessages: Message[];
  setSavedMessages: (messages: Message[]) => void;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
}

export const useChatActions = ({
  language,
  isAnonymous,
  setIsAnonymous,
  messages,
  setMessages,
  savedMessages,
  setSavedMessages,
  isListening,
  setIsListening
}: UseChatActionsProps) => {
  const navigate = useNavigate();

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
    toggleAnonymous,
    toggleListening,
    handleActionClick
  };
};
