
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaymentHeader = () => {
  const navigate = useNavigate();

  const handleBackToMarketplace = () => {
    navigate('/marketplace');
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        <Button
          variant="outline"
          onClick={handleBackToMarketplace}
          className="flex items-center gap-2 bg-black text-white border-black hover:bg-gray-800 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Marketplace
        </Button>
        <h1 className="text-xl font-semibold text-gray-900">Payment</h1>
        <div className="w-[120px]"></div> {/* Spacer for center alignment */}
      </div>
    </div>
  );
};

export default PaymentHeader;
