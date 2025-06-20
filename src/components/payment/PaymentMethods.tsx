
import React, { useState } from 'react';
import PaymentMethodSelection from './PaymentMethodSelection';
import UPIPayment from './UPIPayment';
import CardPayment from './CardPayment';

interface PaymentMethodsProps {
  onPaymentSuccess: () => void;
}

const PaymentMethods = ({ onPaymentSuccess }: PaymentMethodsProps) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | null>('upi');
  const [selectedBank, setSelectedBank] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    pin: ''
  });
  const [showPinInput, setShowPinInput] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleUPIPayment = () => {
    setShowQR(true);
    setTimeout(() => {
      onPaymentSuccess();
    }, 3000);
  };

  const handleCardPayment = () => {
    if (!selectedBank) return;
    setShowPinInput(true);
  };

  const handlePinSubmit = () => {
    onPaymentSuccess();
  };

  return (
    <div className="space-y-6">
      <PaymentMethodSelection 
        paymentMethod={paymentMethod}
        onMethodChange={setPaymentMethod}
      />

      {paymentMethod === 'upi' && (
        <UPIPayment 
          showQR={showQR}
          onGenerateQR={handleUPIPayment}
        />
      )}

      {paymentMethod === 'card' && (
        <CardPayment
          selectedBank={selectedBank}
          cardDetails={cardDetails}
          showPinInput={showPinInput}
          onBankSelect={setSelectedBank}
          onCardDetailsChange={setCardDetails}
          onContinuePayment={handleCardPayment}
          onCompletePayment={handlePinSubmit}
        />
      )}
    </div>
  );
};

export default PaymentMethods;
