
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
    <div className="min-h-screen bg-gray-50">
      <PaymentHeader />

      {/* Main content */}
      <div className="flex-1 p-4 sm:p-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Complete Payment
            </h1>
            <p className="text-gray-600 text-lg">
              Secure checkout for your legal consultation
            </p>
          </div>

          {/* Payment Layout */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Payment Methods - Left Side */}
            <div className="lg:col-span-1">
              <PaymentMethods onPaymentSuccess={handlePaymentSuccess} />
            </div>

            {/* Order Summary - Right Side */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <OrderSummary lawyer={lawyer} selectedIssue={selectedIssue} />
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full border">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Your payment information is secure and encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
