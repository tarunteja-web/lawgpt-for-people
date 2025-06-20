
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Send, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const LawyerChat = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  const lawyer = JSON.parse(localStorage.getItem('selectedLawyer') || '{}');

  useEffect(() => {
    // Initial lawyer greeting
    const greeting: Message = {
      id: '1',
      text: `Hello! I'm ${lawyer.name}. I've received your case details and I'm here to help you. Let's discuss your legal matter in detail.`,
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages([greeting]);
  }, [lawyer.name]);

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

    // Simulate lawyer response
    setTimeout(() => {
      const lawyerResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateLawyerResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, lawyerResponse]);
    }, 2000);
  };

  const generateLawyerResponse = (userInput: string) => {
    const responses = [
      "I understand your concern. Based on what you've shared, here are your legal options...",
      "That's a valid point. Let me explain the legal implications of this situation.",
      "I've handled similar cases before. Here's what I recommend as the next steps...",
      "This is indeed a complex matter. Let me break down the legal framework for you.",
      "Thank you for providing those details. This information will be crucial for your case."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b p-4 flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/marketplace')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold">{lawyer.name}</h1>
          <p className="text-sm text-gray-600">{lawyer.specialization} • {lawyer.language}</p>
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
                : 'bg-white'
            }`}>
              <p className="text-sm">{message.text}</p>
              <span className="text-xs opacity-70 mt-2 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </Card>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4">
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
            placeholder="Type your message to the lawyer..."
            className="flex-1"
          />
          
          <Button onClick={handleSendMessage} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {isListening && (
          <div className="mt-2 text-center">
            <div className="animate-pulse text-red-500 font-medium">
              🎙 Listening...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LawyerChat;
