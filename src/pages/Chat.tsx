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
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-full">
                {t.options}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              {buttons.map(button => (
                <DropdownMenuItem 
                  key={button.key} 
                  onClick={button.onClick}
                  className="flex items-center space-x-2"
                >
                  <button.icon className="h-4 w-4" />
                  <span>{button.text}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }

    return (
      <div className="flex justify-center space-x-2 flex-wrap">
        {buttons.map(button => (
          <Button
            key={button.key}
            variant={button.variant}
            onClick={button.onClick}
            className="flex items-center space-x-2 rounded-full"
          >
            <button.icon className="h-4 w-4" />
            <span>{button.text}</span>
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} ${isAnonymous ? 'bg-gradient-to-br from-gray-800 to-gray-900' : ''}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b p-4 flex items-center justify-between ${isAnonymous ? 'bg-gray-800/90 backdrop-blur' : ''}`}>
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">LawGPT</h1>
          {isAnonymous && <Shield className="h-5 w-5 text-blue-400" />}
        </div>
        
        <div className="flex items-center space-x-4">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-32">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिंदी</SelectItem>
              <SelectItem value="te">తెలుగు</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="ghost" size="sm" onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
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
                ? 'bg-blue-600 text-white ml-auto' 
                : isDarkMode 
                  ? 'bg-gray-800 text-white' 
                  : 'bg-white'
            } ${isAnonymous && !message.isUser ? 'bg-gray-700 text-white border-gray-600' : ''}`}>
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
      <div className="p-4 border-t">
        <ActionButtons />
      </div>

      {/* Input Area */}
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t p-4`}>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleListening}
            className={isListening ? 'text-red-500' : ''}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={t.typeMessage}
            className="flex-1"
          />
          
          <Button onClick={handleSendMessage} size="sm">
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
