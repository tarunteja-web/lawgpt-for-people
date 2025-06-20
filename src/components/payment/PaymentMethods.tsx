
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PaymentMethodsProps {
  onPaymentSuccess: () => void;
}

const PaymentMethods = ({ onPaymentSuccess }: PaymentMethodsProps) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | null>(null);
  const [selectedBank, setSelectedBank] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    pin: ''
  });
  const [showPinInput, setShowPinInput] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const banks = ['SBI', 'HDFC', 'ICICI', 'Axis Bank', 'Kotak Mahindra'];

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
    <Card className="bg-white border border-gray-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-gray-900">Choose Payment Method</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* UPI Payment */}
        <div className="space-y-4">
          <Button
            onClick={() => setPaymentMethod('upi')}
            variant={paymentMethod === 'upi' ? 'default' : 'outline'}
            className={`w-full text-left justify-start ${
              paymentMethod === 'upi' 
                ? 'bg-gray-900 text-white hover:bg-gray-800' 
                : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
            }`}
          >
            🟢 Pay with UPI
          </Button>
          
          {paymentMethod === 'upi' && !showQR && (
            <Button onClick={handleUPIPayment} className="w-full bg-gray-900 text-white hover:bg-gray-800">
              Generate QR Code
            </Button>
          )}
          
          {showQR && (
            <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-48 h-48 bg-white border-2 border-gray-300 mx-auto mb-4 flex items-center justify-center animate-pulse">
                <div className="text-xs text-gray-500">QR Code</div>
              </div>
              <p className="text-sm text-gray-600">Scan with any UPI app</p>
              <div className="animate-pulse text-blue-600 mt-2">Processing payment...</div>
            </div>
          )}
        </div>

        {/* Card Payment */}
        <div className="space-y-4">
          <Button
            onClick={() => setPaymentMethod('card')}
            variant={paymentMethod === 'card' ? 'default' : 'outline'}
            className={`w-full text-left justify-start ${
              paymentMethod === 'card' 
                ? 'bg-gray-900 text-white hover:bg-gray-800' 
                : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
            }`}
          >
            🔵 Pay with Card
          </Button>
          
          {paymentMethod === 'card' && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              {!selectedBank && (
                <div>
                  <Label className="text-gray-700">Choose your bank:</Label>
                  <Select value={selectedBank} onValueChange={setSelectedBank}>
                    <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                      <SelectValue placeholder="Select your bank..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-300">
                      {banks.map(bank => (
                        <SelectItem key={bank} value={bank} className="text-gray-900 hover:bg-gray-100">{bank}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {selectedBank && !showPinInput && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-700">Card Number</Label>
                    <Input
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                      placeholder="1234 5678 9012 3456"
                      className="bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-700">Expiry Date</Label>
                      <Input
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                        placeholder="MM/YY"
                        className="bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700">CVV</Label>
                      <Input
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        placeholder="123"
                        className="bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleCardPayment} className="w-full bg-gray-900 text-white hover:bg-gray-800">
                    Continue
                  </Button>
                </div>
              )}
              
              {showPinInput && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-700">Enter your {selectedBank} Card PIN to proceed</Label>
                    <Input
                      type="password"
                      value={cardDetails.pin}
                      onChange={(e) => setCardDetails({...cardDetails, pin: e.target.value})}
                      placeholder="Enter PIN"
                      maxLength={4}
                      className="bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  
                  <Button onClick={handlePinSubmit} className="w-full bg-gray-900 text-white hover:bg-gray-800">
                    Complete Payment
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethods;
