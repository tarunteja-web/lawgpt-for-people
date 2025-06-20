
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
    <Card className="mb-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black border border-gray-700 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-white">Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-300">Lawyer:</span>
            <span className="font-medium text-white">{lawyer.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Issue Type:</span>
            <Badge variant="secondary" className="bg-gradient-to-r from-gray-600 to-gray-700 text-white">{selectedIssue}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Language:</span>
            <span className="text-white">{lawyer.language}</span>
          </div>
          <hr className="border-gray-600" />
          <div className="flex justify-between text-lg font-bold">
            <span className="text-gray-300">Total Amount:</span>
            <span className="text-green-400">₹{lawyer.fee}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
