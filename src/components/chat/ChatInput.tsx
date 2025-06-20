
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, MicOff, Send, Loader2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useToast } from '@/hooks/use-toast';

interface ChatInputProps {
  inputText: string;
  isListening: boolean;
  isLoading?: boolean;
  isDarkMode: boolean;
  translations: {
    typeMessage: string;
    listening: string;
  };
  language: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onToggleListening: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputText,
  isListening: externalIsListening,
  isLoading = false,
  isDarkMode,
  translations,
  language,
  onInputChange,
  onSendMessage,
  onToggleListening
}) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [speechError, setSpeechError] = useState<string | null>(null);

  const handleSpeechResult = (transcript: string) => {
    console.log('Speech result received:', transcript);
    onInputChange(transcript);
    onToggleListening(); // Stop listening after getting result
  };

  const handleSpeechError = (error: string) => {
    console.error('Speech error:', error);
    setSpeechError(error);
    toast({
      title: "Speech Recognition Error",
      description: error,
      variant: "destructive",
    });
    onToggleListening(); // Stop listening on error
  };

  const {
    isListening: speechIsListening,
    isSupported: speechIsSupported,
    startListening,
    stopListening
  } = useSpeechRecognition({
    language,
    onResult: handleSpeechResult,
    onError: handleSpeechError
  });

  // Use speech recognition listening state if supported, otherwise fall back to external state
  const isActuallyListening = speechIsSupported ? speechIsListening : externalIsListening;

  const handleMicClick = () => {
    if (speechIsSupported) {
      if (isActuallyListening) {
        stopListening();
      } else {
        setSpeechError(null);
        startListening();
      }
    } else {
      // Fallback to external toggle for browsers that don't support speech recognition
      onToggleListening();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      onSendMessage();
    }
  };

  return (
    <div className={`border-t max-w-4xl mx-auto w-full ${isMobile ? 'p-2' : 'p-4'} ${
      isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className={`flex items-center rounded-full ${isMobile ? 'px-3 py-2 space-x-2' : 'px-4 py-3 space-x-3'} ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        <Input
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={isActuallyListening ? `${translations.listening}...` : translations.typeMessage}
          disabled={isLoading || isActuallyListening}
          className={`flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ${
            isDarkMode ? 'text-white placeholder-gray-400' : 'text-black placeholder-gray-500'
          } ${isActuallyListening ? 'placeholder-red-500' : ''}`}
        />
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleMicClick}
          disabled={isLoading}
          className={`${isActuallyListening ? 'text-red-500' : isDarkMode ? 'text-gray-400' : 'text-gray-500'} hover:bg-transparent ${
            !speechIsSupported ? 'opacity-50' : ''
          }`}
          title={speechIsSupported ? 
            (isActuallyListening ? 'Stop listening' : 'Start voice input') : 
            'Speech recognition not supported'
          }
        >
          {isActuallyListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
        
        <Button 
          onClick={onSendMessage} 
          size="sm"
          disabled={isLoading || !inputText.trim() || isActuallyListening}
          className={`rounded-full text-white ${
            isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-black hover:bg-gray-800'
          } ${isMobile ? 'p-1.5' : 'p-2'} disabled:opacity-50`}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {isActuallyListening && (
        <div className="mt-2 text-center">
          <div className="animate-pulse text-red-500 font-medium">
            🎙 {translations.listening}
          </div>
          {speechIsSupported && (
            <div className="text-xs text-gray-500 mt-1">
              Speaking in {language === 'hi' ? 'Hindi' : language === 'te' ? 'Telugu' : 'English'}
            </div>
          )}
        </div>
      )}

      {speechError && (
        <div className="mt-2 text-center text-red-500 text-xs">
          {speechError}
        </div>
      )}
    </div>
  );
};

export default ChatInput;
