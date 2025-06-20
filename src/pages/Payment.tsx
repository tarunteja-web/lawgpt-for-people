
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
    <div className="min-h-screen bg-white flex flex-col">
      <PaymentHeader />

      {/* Main content */}
      <div className="flex-1 bg-gradient-to-br from-blue-50 to-white p-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Your Payment
            </h2>
          </div>

          <OrderSummary lawyer={lawyer} selectedIssue={selectedIssue} />
          <PaymentMethods onPaymentSuccess={handlePaymentSuccess} />
        </div>
      </div>
    </div>
  );
};

export default Payment;
