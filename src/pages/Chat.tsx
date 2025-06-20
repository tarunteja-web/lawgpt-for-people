
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
    const greeting = `Hello! I'm here to help you with your ${selectedIssue} case. I'll need to ask you a few questions to better understand your situation.`;
    
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
        variant: isAnonymous ? 'destructive' as const : 'outline' as const
      },
      { key: 'document', icon: FileText, text: t.document, onClick: () => handleActionClick('document'), variant: 'outline' as const },
      { key: 'call', icon: Phone, text: t.call, onClick: () => handleActionClick('call'), variant: 'outline' as const },
      { key: 'allset', icon: CheckCircle, text: t.allSet, onClick: () => handleActionClick('allset'), variant: 'outline' as const }
    ];

    return (
      <div className="flex justify-center items-center gap-4 px-4 py-6">
        {buttons.map(button => (
          <Button
            key={button.key}
            variant={button.variant}
            onClick={button.onClick}
            className="flex items-center gap-2 rounded-full border border-gray-300 px-6 py-2 bg-white text-black hover:bg-gray-50"
          >
            <button.icon className="h-4 w-4" />
            <span className="text-sm">{button.text}</span>
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-black">LawGPT</h1>
          <span className="text-sm text-gray-500">Legal AI Assistant</span>
          {isAnonymous && <Shield className="h-5 w-5 text-gray-400" />}
        </div>
        
        <div className="flex items-center space-x-4">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-20 border-gray-300">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300">
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="hi">हि</SelectItem>
              <SelectItem value="te">తె</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="ghost" size="sm" onClick={() => setIsDarkMode(!isDarkMode)} className="text-black hover:bg-gray-100">
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-black hover:bg-gray-100">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 max-w-4xl mx-auto w-full">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-6 ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            {!message.isUser && (
              <div className="bg-gray-100 rounded-2xl p-4 max-w-md">
                <p className="text-sm text-gray-700 leading-relaxed">{message.text}</p>
              </div>
            )}
            {message.isUser && (
              <div className="bg-black rounded-2xl p-4 max-w-md">
                <p className="text-sm text-white leading-relaxed">{message.text}</p>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Action Buttons */}
      <ActionButtons />

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 max-w-4xl mx-auto w-full">
        <div className="flex items-center space-x-3 bg-gray-50 rounded-full px-4 py-3">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={t.typeMessage}
            className="flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none text-black placeholder-gray-500"
          />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleListening}
            className={`${isListening ? 'text-red-500' : 'text-gray-500'} hover:bg-transparent`}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          
          <Button 
            onClick={handleSendMessage} 
            size="sm"
            className="bg-black text-white rounded-full p-2 hover:bg-gray-800"
          >
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
