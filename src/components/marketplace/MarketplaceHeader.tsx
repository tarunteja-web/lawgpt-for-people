
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
          className="flex items-center gap-2 text-sm bg-white border-gray-300 hover:bg-gray-50 text-gray-700 hover:text-gray-900"
          size="sm"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Back to Chat</span>
        </Button>
        
        <div className="flex items-center gap-2 text-gray-700 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
          <Scale size={20} className="text-gray-900" />
          <span className="text-sm font-medium text-gray-900">Expert Lawyers</span>
        </div>
      </div>
      
      <div className="text-center space-y-2 bg-white text-gray-900 py-8 px-4 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-2xl md:text-4xl font-bold leading-tight text-gray-900">
          {selectedLegalIssue ? (
            <>
              <span className="block md:inline">{selectedLegalIssue}</span>
              <span className="block md:inline md:ml-2">Legal Experts</span>
            </>
          ) : (
            'Connect with Expert Lawyers'
          )}
        </h1>
        <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
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
