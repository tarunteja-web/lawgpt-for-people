
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
      <div className="flex-1 p-3 sm:p-4 lg:p-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Complete Payment
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Secure checkout for your legal consultation
            </p>
          </div>

          {/* Payment Layout - Mobile First */}
          <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Order Summary - First on Mobile */}
            <div className="order-1 lg:order-2">
              <div className="lg:sticky lg:top-6">
                <OrderSummary lawyer={lawyer} selectedIssue={selectedIssue} />
              </div>
            </div>

            {/* Payment Methods - Second on Mobile */}
            <div className="order-2 lg:order-1">
              <PaymentMethods onPaymentSuccess={handlePaymentSuccess} />
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 sm:mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-white px-3 sm:px-4 py-2 rounded-full border border-gray-200 shadow-sm">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
