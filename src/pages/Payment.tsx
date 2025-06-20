
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | null>(null);
  const [selectedBank, setSelectedBank] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    pin: ''
  });
  const [showPinInput, setShowPinInput] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const lawyer = JSON.parse(localStorage.getItem('selectedLawyer') || '{}');
  const selectedIssue = localStorage.getItem('selectedLegalIssue') || 'General';

  const banks = ['SBI', 'HDFC', 'ICICI', 'Axis Bank', 'Kotak Mahindra'];

  const handleUPIPayment = () => {
    setShowQR(true);
    setTimeout(() => {
      setPaymentSuccess(true);
    }, 3000);
  };

  const handleCardPayment = () => {
    if (!selectedBank) return;
    setShowPinInput(true);
  };

  const handlePinSubmit = () => {
    setPaymentSuccess(true);
  };

  const proceedToLawyerChat = () => {
    navigate('/lawyer-chat');
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8 space-y-6">
            <div className="animate-scale-in">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h2>
              <p className="text-gray-600 mb-4">Total Paid: ₹{lawyer.fee}</p>
            </div>
            
            <Button 
              onClick={proceedToLawyerChat}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Chat with Your Lawyer
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Complete Your Payment
          </h1>
        </div>

        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Lawyer:</span>
                <span className="font-medium">{lawyer.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Issue Type:</span>
                <Badge variant="secondary">{selectedIssue}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Language:</span>
                <span>{lawyer.language}</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-green-600">₹{lawyer.fee}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Choose Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* UPI Payment */}
            <div className="space-y-4">
              <Button
                onClick={() => setPaymentMethod('upi')}
                variant={paymentMethod === 'upi' ? 'default' : 'outline'}
                className="w-full text-left justify-start"
              >
                🟢 Pay with UPI
              </Button>
              
              {paymentMethod === 'upi' && !showQR && (
                <Button onClick={handleUPIPayment} className="w-full">
                  Generate QR Code
                </Button>
              )}
              
              {showQR && (
                <div className="text-center p-6 bg-gray-50 rounded-lg">
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
                className="w-full text-left justify-start"
              >
                🔵 Pay with Card
              </Button>
              
              {paymentMethod === 'card' && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  {!selectedBank && (
                    <div>
                      <Label>Choose your bank:</Label>
                      <Select value={selectedBank} onValueChange={setSelectedBank}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your bank..." />
                        </SelectTrigger>
                        <SelectContent>
                          {banks.map(bank => (
                            <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {selectedBank && !showPinInput && (
                    <div className="space-y-4">
                      <div>
                        <Label>Card Number</Label>
                        <Input
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Expiry Date</Label>
                          <Input
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <Label>CVV</Label>
                          <Input
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                            placeholder="123"
                          />
                        </div>
                      </div>
                      
                      <Button onClick={handleCardPayment} className="w-full">
                        Continue
                      </Button>
                    </div>
                  )}
                  
                  {showPinInput && (
                    <div className="space-y-4">
                      <div>
                        <Label>Enter your {selectedBank} Card PIN to proceed</Label>
                        <Input
                          type="password"
                          value={cardDetails.pin}
                          onChange={(e) => setCardDetails({...cardDetails, pin: e.target.value})}
                          placeholder="Enter PIN"
                          maxLength={4}
                        />
                      </div>
                      
                      <Button onClick={handlePinSubmit} className="w-full">
                        Complete Payment
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
