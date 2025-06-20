
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatHeader from '@/components/chat/ChatHeader';
import MessageList from '@/components/chat/MessageList';
import ActionButtons from '@/components/chat/ActionButtons';
import ChatInput from '@/components/chat/ChatInput';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chat = () => {
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

  const translations = {
    en: {
      anonymous: 'Anonymous',
      exitAnonymous: 'Exit Anonymous',
      document: 'Document',
      call: 'Call',
      allSet: "We're All Set",
      options: 'Options',
      listening: 'Listening...',
      typeMessage: 'Type your message...',
      anonymousMode: 'You are now in Anonymous Mode. Your identity is hidden.',
      exitingAnonymous: 'Exiting Anonymous Mode. Returning to your previous session.'
    },
    hi: {
      anonymous: 'गुमनाम',
      exitAnonymous: 'गुमनाम से बाहर निकलें',
      document: 'दस्तावेज़',
      call: 'कॉल',
      allSet: 'हम सब तैयार हैं',
      options: 'विकल्प',
      listening: 'सुन रहे हैं...',
      typeMessage: 'अपना संदेश टाइप करें...',
      anonymousMode: 'आप अब गुमनाम मोड में हैं। आपकी पहचान छुपी हुई है।',
      exitingAnonymous: 'गुमनाम मोड से बाहर निकल रहे हैं। आपके पिछले सेशन पर वापस जा रहे हैं।'
    },
    te: {
      anonymous: 'అజ్ఞాత',
      exitAnonymous: 'అజ్ఞాత నుండి నిష్క్రమించు',
      document: 'పత్రం',
      call: 'కాల్',
      allSet: 'మేము అన్నీ సిద్ధం చేసాము',
      options: 'ఎంపికలు',
      listening: 'వింటున్నాము...',
      typeMessage: 'మీ సందేశాన్ని టైప్ చేయండి...',
      anonymousMode: 'మీరు ఇప్పుడు అజ్ఞాత మోడ్‌లో ఉన్నారు. మీ గుర్తింపు దాచబడింది.',
      exitingAnonymous: 'అజ్ఞాత మోడ్ నుండి నిష్క్రమిస్తున్నారు. మీ మునుపటి సెషన్‌కు తిరిగి వెళ్లుతున్నారు.'
    }
  };

  const t = translations[language as keyof typeof translations];

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

  const generateAIResponse = (userInput: string, issue: string) => {
    if (issue === 'Divorce') {
      return "I understand you're dealing with a divorce matter. Can you tell me if this is a mutual decision or if there are contested issues?";
    }
    return "Thank you for sharing that information. Let me help you understand your legal options better.";
  };

  const toggleAnonymous = () => {
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
      case 'call':
        console.log('Initiating call...');
        break;
      case 'allset':
        navigate('/marketplace');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <ChatHeader
        isAnonymous={isAnonymous}
        language={language}
        isDarkMode={isDarkMode}
        onLanguageChange={setLanguage}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      <MessageList messages={messages} />

      <ActionButtons
        isAnonymous={isAnonymous}
        translations={t}
        onToggleAnonymous={toggleAnonymous}
        onActionClick={handleActionClick}
      />

      <ChatInput
        inputText={inputText}
        isListening={isListening}
        translations={t}
        onInputChange={setInputText}
        onSendMessage={handleSendMessage}
        onToggleListening={toggleListening}
      />
    </div>
  );
};

export default Chat;
