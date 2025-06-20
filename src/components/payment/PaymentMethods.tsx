import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Smartphone, CheckCircle, Shield, Clock, Award } from 'lucide-react';

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
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <Card className="bg-white border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900">
            Choose Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* UPI Option */}
          <button
            onClick={() => setPaymentMethod('upi')}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
              paymentMethod === 'upi'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  paymentMethod === 'upi' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <Smartphone className={`w-5 h-5 ${
                    paymentMethod === 'upi' ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">UPI Payment</div>
                  <div className="text-sm text-gray-500">Pay using any UPI app</div>
                </div>
              </div>
              {paymentMethod === 'upi' && (
                <CheckCircle className="w-5 h-5 text-blue-600" />
              )}
            </div>
          </button>

          {/* Card Option */}
          <button
            onClick={() => setPaymentMethod('card')}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
              paymentMethod === 'card'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  paymentMethod === 'card' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <CreditCard className={`w-5 h-5 ${
                    paymentMethod === 'card' ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Debit/Credit Card</div>
                  <div className="text-sm text-gray-500">Visa, Mastercard, RuPay</div>
                </div>
              </div>
              {paymentMethod === 'card' && (
                <CheckCircle className="w-5 h-5 text-blue-600" />
              )}
            </div>
          </button>
        </CardContent>
      </Card>

      {/* Payment Information Section */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-green-600" />
            </div>
            <h3 className="font-semibold text-green-800">100% Secure</h3>
          </div>
          <p className="text-sm text-green-700">
            Your payment is protected with bank-level security and encryption.
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="font-semibold text-blue-800">Instant Booking</h3>
          </div>
          <p className="text-sm text-blue-700">
            Your consultation will be confirmed immediately after payment.
          </p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Award className="w-4 h-4 text-purple-600" />
            </div>
            <h3 className="font-semibold text-purple-800">Quality Assured</h3>
          </div>
          <p className="text-sm text-purple-700">
            All our lawyers are verified professionals with proven expertise.
          </p>
        </div>
      </div>

      {/* Payment Process Information */}
      <Card className="bg-gray-50 border border-gray-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">What happens after payment?</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600">
                1
              </div>
              <span>Instant payment confirmation and receipt via email</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600">
                2
              </div>
              <span>Lawyer contact details and consultation link shared</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600">
                3
              </div>
              <span>Direct access to chat with your chosen lawyer</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* UPI Payment Details */}
      {paymentMethod === 'upi' && (
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            {!showQR ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Smartphone className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">UPI Payment</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Scan QR code with any UPI app to complete payment
                  </p>
                </div>
                <Button 
                  onClick={handleUPIPayment}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
                >
                  Generate QR Code
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-dashed border-blue-300 mx-auto rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <div className="text-xs text-gray-400">QR Code</div>
                    </div>
                    <div className="text-xs text-gray-500">Scan to Pay</div>
                  </div>
                </div>
                <div className="animate-pulse">
                  <div className="flex items-center justify-center gap-2 text-blue-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Processing payment...</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Card Payment Details */}
      {paymentMethod === 'card' && (
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6 space-y-4">
            {!selectedBank ? (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Select Your Bank
                  </Label>
                  <Select value={selectedBank} onValueChange={setSelectedBank}>
                    <SelectTrigger className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Choose your bank..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-300 shadow-lg">
                      {banks.map(bank => (
                        <SelectItem key={bank} value={bank} className="hover:bg-gray-50">
                          {bank}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : !showPinInput ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">Bank: {selectedBank}</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Card Number
                    </Label>
                    <Input
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                      placeholder="1234 5678 9012 3456"
                      className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Expiry Date
                      </Label>
                      <Input
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                        placeholder="MM/YY"
                        className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        CVV
                      </Label>
                      <Input
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        placeholder="123"
                        className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleCardPayment} 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium mt-6"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CreditCard className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Enter PIN</h3>
                  <p className="text-sm text-gray-600">Enter your {selectedBank} card PIN to complete payment</p>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Card PIN
                  </Label>
                  <Input
                    type="password"
                    value={cardDetails.pin}
                    onChange={(e) => setCardDetails({...cardDetails, pin: e.target.value})}
                    placeholder="••••"
                    maxLength={4}
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-center text-lg tracking-widest"
                  />
                </div>
                
                <Button 
                  onClick={handlePinSubmit} 
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium mt-6"
                >
                  Complete Payment
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PaymentMethods;
