
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MarketplaceHeaderProps {
  selectedLegalIssue: string;
}

const MarketplaceHeader = ({ selectedLegalIssue }: MarketplaceHeaderProps) => {
  const navigate = useNavigate();

  const handleBackToChat = () => {
    navigate('/chat');
  };

  return (
    <div className="relative mb-6 md:mb-8">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          onClick={handleBackToChat}
          className="flex items-center gap-2 text-sm bg-gradient-to-r from-white to-gray-100 border-gray-300 hover:from-gray-100 hover:to-gray-200"
          size="sm"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Back to Chat</span>
        </Button>
        
        <div className="flex items-center gap-2 text-gray-600 bg-gradient-to-r from-gray-800 to-black px-4 py-2 rounded-lg">
          <Scale size={20} className="text-white" />
          <span className="text-sm font-medium text-white">Expert Lawyers</span>
        </div>
      </div>
      
      <div className="text-center space-y-2 bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white py-8 px-4 rounded-xl shadow-2xl">
        <h1 className="text-2xl md:text-4xl font-bold leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {selectedLegalIssue ? (
            <>
              <span className="block md:inline">{selectedLegalIssue}</span>
              <span className="block md:inline md:ml-2">Legal Experts</span>
            </>
          ) : (
            'Connect with Expert Lawyers'
          )}
        </h1>
        <p className="text-sm md:text-lg text-gray-300 max-w-2xl mx-auto px-4">
          {selectedLegalIssue 
            ? `Find specialized ${selectedLegalIssue.toLowerCase()} lawyers in Andhra Pradesh & Telangana`
            : 'Choose from our verified Telugu-speaking legal experts across AP & Telangana'
          }
        </p>
      </div>
    </div>
  );
};

export default MarketplaceHeader;
