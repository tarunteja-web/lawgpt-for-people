
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Smartphone, CheckCircle } from 'lucide-react';

interface PaymentMethodSelectionProps {
  paymentMethod: 'upi' | 'card' | null;
  onMethodChange: (method: 'upi' | 'card') => void;
}

const PaymentMethodSelection = ({ paymentMethod, onMethodChange }: PaymentMethodSelectionProps) => {
  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900">
          Choose Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* UPI Option */}
        <button
          onClick={() => onMethodChange('upi')}
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
          onClick={() => onMethodChange('card')}
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
  );
};

export default PaymentMethodSelection;
