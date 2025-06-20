
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface OrderSummaryProps {
  lawyer: {
    name: string;
    fee: string;
    language: string;
  };
  selectedIssue: string;
}

const OrderSummary = ({ lawyer, selectedIssue }: OrderSummaryProps) => {
  return (
    <Card className="mb-6 bg-white border border-gray-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-gray-900">Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Lawyer:</span>
            <span className="font-medium text-gray-900">{lawyer.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Issue Type:</span>
            <Badge variant="secondary" className="bg-gray-100 text-gray-800">{selectedIssue}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Language:</span>
            <span className="text-gray-900">{lawyer.language}</span>
          </div>
          <hr className="border-gray-200" />
          <div className="flex justify-between text-lg font-bold">
            <span className="text-gray-600">Total Amount:</span>
            <span className="text-green-600">₹{lawyer.fee}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
