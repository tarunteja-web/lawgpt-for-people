
import React, { useState } from 'react';
import PaymentHeader from '@/components/payment/PaymentHeader';
import OrderSummary from '@/components/payment/OrderSummary';
import PaymentMethods from '@/components/payment/PaymentMethods';
import PaymentSuccess from '@/components/payment/PaymentSuccess';

const Payment = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const lawyer = JSON.parse(localStorage.getItem('selectedLawyer') || '{}');
  const selectedIssue = localStorage.getItem('selectedLegalIssue') || 'General';

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
  };

  if (paymentSuccess) {
    return <PaymentSuccess lawyer={lawyer} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex flex-col">
      <PaymentHeader />

      {/* Main content */}
      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white py-8 px-4 rounded-xl shadow-2xl border border-gray-700">
            <h2 className="text-2xl md:text-3xl font-bold leading-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
              Complete Your Payment
            </h2>
            <p className="text-sm md:text-lg text-gray-300 max-w-xl mx-auto">
              Secure payment for your legal consultation
            </p>
          </div>

          <OrderSummary lawyer={lawyer} selectedIssue={selectedIssue} />
          <PaymentMethods onPaymentSuccess={handlePaymentSuccess} />
        </div>
      </div>
    </div>
  );
};

export default Payment;
