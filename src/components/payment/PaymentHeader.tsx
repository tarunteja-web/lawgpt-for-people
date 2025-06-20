
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
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto max-w-4xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBackToMarketplace}
            className="flex items-center gap-2 text-gray-600 border-gray-300 hover:bg-gray-50"
            size="sm"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back</span>
          </Button>
          
          <div className="flex items-center gap-2 text-green-600">
            <Shield size={20} />
            <span className="text-sm font-medium">Secure Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHeader;
