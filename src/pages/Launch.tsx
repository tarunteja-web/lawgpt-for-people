
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Launch = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 border border-gray-700 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 border border-gray-700 rounded-full animate-pulse delay-1000"></div>
      </div>
      
      <div className="text-center z-10 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Legal AI Assistant
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12">
            Your private AI legal assistant
          </p>
        </div>
        
        <Button 
          onClick={() => navigate('/login')}
          className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
        >
          Start Now
        </Button>
      </div>
    </div>
  );
};

export default Launch;
