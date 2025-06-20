
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { Shield, ShieldOff, FileText, Phone, CheckCircle, Mic, MicOff, Send, Globe, User, Moon, Sun } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chat = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
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
    // Initial AI greeting based on selected issue
    const greeting = `Hello! I'm here to help you with your ${selectedIssue} matter. Let me ask you a few questions to better understand your situation.`;
    
    const initialMessage: Message = {
      id: '1',
      text: greeting,
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages([initialMessage]);
  }, [selectedIssue]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

    // Simulate AI response
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
    // Simple AI response logic based on issue type
    if (issue === 'Divorce') {
      return "I understand you're dealing with a divorce matter. Can you tell me if this is a mutual decision or if there are contested issues?";
    }
    return "Thank you for sharing that information. Let me help you understand your legal options better.";
  };

  const toggleAnonymous = () => {
    if (!isAnonymous) {
      // Entering anonymous mode
      setSavedMessages(messages);
      setMessages([{
        id: 'anon-1',
        text: t.anonymousMode,
        isUser: false,
        timestamp: new Date()
      }]);
    } else {
      // Exiting anonymous mode
      setMessages(savedMessages);
    }
    setIsAnonymous(!isAnonymous);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Simulate voice recognition
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

  const ActionButtons = () => {
    const buttons = [
      { 
        key: 'anonymous', 
        icon: isAnonymous ? ShieldOff : Shield, 
        text: isAnonymous ? t.exitAnonymous : t.anonymous,
        onClick: toggleAnonymous,
        variant: isAnonymous ? 'destructive' as const : 'default' as const
      },
      { key: 'document', icon: FileText, text: t.document, onClick: () => handleActionClick('document'), variant: 'outline' as const },
      { key: 'call', icon: Phone, text: t.call, onClick: () => handleActionClick('call'), variant: 'outline' as const },
      { key: 'allset', icon: CheckCircle, text: t.allSet, onClick: () => handleActionClick('allset'), variant: 'outline' as const }
    ];

    if (isMobile) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full bg-white text-black border-black hover:bg-black hover:text-white">
              {t.options}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full bg-white border-black">
            {buttons.map(button => (
              <DropdownMenuItem 
                key={button.key} 
                onClick={button.onClick}
                className="flex items-center space-x-2 text-black hover:bg-black hover:text-white"
              >
                <button.icon className="h-4 w-4" />
                <span>{button.text}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <div className="flex space-x-2 flex-wrap">
        {buttons.map(button => (
          <Button
            key={button.key}
            variant={button.variant}
            onClick={button.onClick}
            className={`flex items-center space-x-2 ${
              button.variant === 'destructive' 
                ? 'bg-black text-white hover:bg-gray-800' 
                : button.variant === 'default'
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-white text-black border-black hover:bg-black hover:text-white'
            }`}
          >
            <button.icon className="h-4 w-4" />
            <span>{button.text}</span>
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} ${isAnonymous ? 'bg-gradient-to-br from-gray-900 to-black' : ''}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-black'} border-b p-4 flex items-center justify-between ${isAnonymous ? 'bg-black/90 backdrop-blur' : ''}`}>
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">LawGPT</h1>
          {isAnonymous && <Shield className="h-5 w-5 text-white" />}
        </div>
        
        <div className="flex items-center space-x-4">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className={`w-32 ${isDarkMode ? 'bg-black border-gray-800 text-white' : 'bg-white border-black text-black'}`}>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className={isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-black'}>
              <SelectItem value="en" className={isDarkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'}>English</SelectItem>
              <SelectItem value="hi" className={isDarkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'}>हिंदी</SelectItem>
              <SelectItem value="te" className={isDarkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'}>తెలుగు</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="ghost" size="sm" onClick={() => setIsDarkMode(!isDarkMode)} className={isDarkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'}>
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <Button variant="ghost" size="sm" className={`flex items-center space-x-2 ${isDarkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'}`}>
            <User className="h-4 w-4" />
            <span className="hidden md:inline">{userName}</span>
          </Button>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <Card className={`max-w-md p-4 ${
              message.isUser 
                ? 'bg-black text-white ml-auto' 
                : isDarkMode 
                  ? 'bg-gray-900 text-white border-gray-800' 
                  : 'bg-white text-black border-black'
            } ${isAnonymous && !message.isUser ? 'bg-gray-800 text-white border-gray-700' : ''}`}>
              <p className="text-sm">{message.text}</p>
              <span className="text-xs opacity-70 mt-2 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </Card>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Action Buttons */}
      <div className={`p-4 ${isDarkMode ? 'border-gray-800' : 'border-black'} border-t`}>
        <ActionButtons />
      </div>

      {/* Input Area */}
      <div className={`${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-black'} border-t p-4`}>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleListening}
            className={`${isListening ? 'text-red-500' : isDarkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'}`}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={t.typeMessage}
            className={`flex-1 ${isDarkMode ? 'bg-black border-gray-800 text-white' : 'bg-white border-black text-black'}`}
          />
          
          <Button onClick={handleSendMessage} size="sm" className="bg-black text-white hover:bg-gray-800">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {isListening && (
          <div className="mt-2 text-center">
            <div className="animate-pulse text-red-500 font-medium">
              🎙 {t.listening}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
