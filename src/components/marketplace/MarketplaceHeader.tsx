
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <Button
          variant="outline"
          onClick={handleBackToChat}
          className="absolute left-4 flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Chat
        </Button>
      </div>
      <h1 className="text-4xl font-bold text-black mb-4">
        {selectedLegalIssue ? `${selectedLegalIssue} Lawyers` : 'Connect with Expert Lawyers'}
      </h1>
      <p className="text-lg text-gray-600">
        {selectedLegalIssue 
          ? `Specialized ${selectedLegalIssue.toLowerCase()} experts in Telugu`
          : 'Choose from our verified Telugu-speaking legal experts'
        }
      </p>
    </div>
  );
};

export default MarketplaceHeader;
