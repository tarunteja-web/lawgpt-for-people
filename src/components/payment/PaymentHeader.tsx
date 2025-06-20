
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaymentHeader = () => {
  const navigate = useNavigate();

  const handleBackToMarketplace = () => {
    navigate('/marketplace');
  };

  return (
    <div className="relative mb-6 md:mb-8">
      <div className="flex items-center justify-between mb-4 px-4 py-6">
        <Button
          variant="outline"
          onClick={handleBackToMarketplace}
          className="flex items-center gap-2 text-sm bg-gradient-to-r from-gray-700 to-gray-800 border-gray-600 hover:from-gray-600 hover:to-gray-700 text-white hover:text-white"
          size="sm"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Back to Marketplace</span>
        </Button>
        
        <div className="flex items-center gap-2 text-gray-300 bg-gradient-to-r from-black via-gray-900 to-gray-800 px-4 py-2 rounded-lg shadow-lg">
          <CreditCard size={20} className="text-white" />
          <span className="text-sm font-medium text-white">Secure Payment</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentHeader;
