
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Scale, Globe } from 'lucide-react';

interface OrderSummaryProps {
  lawyer: {
    name: string;
    fee: string;
    language: string;
  };
  selectedIssue: string;
}

const OrderSummary = ({ lawyer, selectedIssue }: OrderSummaryProps) => {
  const subtotal = parseInt(lawyer.fee);
  const processingFee = Math.round(subtotal * 0.03); // 3% processing fee
  const total = subtotal + processingFee;

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardHeader className="pb-4 border-b border-gray-100">
        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Scale className="w-5 h-5 text-blue-600" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        {/* Lawyer Info */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{lawyer.name}</h3>
              <p className="text-sm text-gray-600">Legal Consultant</p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-600 flex items-center gap-2">
              <Scale className="w-4 h-4" />
              Issue Type:
            </span>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
              {selectedIssue}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-600 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Language:
            </span>
            <span className="text-sm font-medium text-gray-900">{lawyer.language}</span>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Pricing Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Consultation Fee</span>
            <span className="text-sm font-medium text-gray-900">₹{subtotal}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Processing Fee</span>
            <span className="text-sm font-medium text-gray-900">₹{processingFee}</span>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Total */}
        <div className="flex justify-between items-center py-2 bg-gray-50 px-4 rounded-lg">
          <span className="text-base font-semibold text-gray-900">Total Amount</span>
          <span className="text-xl font-bold text-blue-600">₹{total}</span>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>100% Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Instant Confirmation</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
