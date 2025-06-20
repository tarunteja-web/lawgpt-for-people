
import React from 'react';

interface MarketplaceHeaderProps {
  selectedLegalIssue: string;
}

const MarketplaceHeader = ({ selectedLegalIssue }: MarketplaceHeaderProps) => {
  return (
    <div className="text-center mb-8">
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
