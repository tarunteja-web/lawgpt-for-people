
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaymentHeader = () => {
  const navigate = useNavigate();

  const handleBackToMarketplace = () => {
    navigate('/marketplace');
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto max-w-4xl px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBackToMarketplace}
            className="flex items-center gap-1 sm:gap-2 text-gray-700 border-gray-300 hover:bg-gray-50 h-8 sm:h-9 px-2 sm:px-3 text-sm"
            size="sm"
          >
            <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Back</span>
          </Button>
          
          <div className="flex items-center gap-1 sm:gap-2 text-blue-600">
            <Shield size={16} className="sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-medium">Secure Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHeader;
