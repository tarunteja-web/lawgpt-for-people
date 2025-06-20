
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, CheckCircle } from 'lucide-react';

interface CardDetails {
  number: string;
  expiry: string;
  cvv: string;
  pin: string;
}

interface CardPaymentProps {
  selectedBank: string;
  cardDetails: CardDetails;
  showPinInput: boolean;
  onBankSelect: (bank: string) => void;
  onCardDetailsChange: (details: CardDetails) => void;
  onContinuePayment: () => void;
  onCompletePayment: () => void;
}

const CardPayment = ({
  selectedBank,
  cardDetails,
  showPinInput,
  onBankSelect,
  onCardDetailsChange,
  onContinuePayment,
  onCompletePayment
}: CardPaymentProps) => {
  const banks = ['SBI', 'HDFC', 'ICICI', 'Axis Bank', 'Kotak Mahindra'];

  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardContent className="p-6 space-y-4">
        {!selectedBank ? (
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Select Your Bank
              </Label>
              <Select value={selectedBank} onValueChange={onBankSelect}>
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
                  onChange={(e) => onCardDetailsChange({...cardDetails, number: e.target.value})}
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
                    onChange={(e) => onCardDetailsChange({...cardDetails, expiry: e.target.value})}
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
                    onChange={(e) => onCardDetailsChange({...cardDetails, cvv: e.target.value})}
                    placeholder="123"
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <Button 
                onClick={onContinuePayment} 
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
                onChange={(e) => onCardDetailsChange({...cardDetails, pin: e.target.value})}
                placeholder="••••"
                maxLength={4}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-center text-lg tracking-widest"
              />
            </div>
            
            <Button 
              onClick={onCompletePayment} 
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium mt-6"
            >
              Complete Payment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CardPayment;
