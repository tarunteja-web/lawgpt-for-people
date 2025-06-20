
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
  );
};

export default OrderSummary;
