
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PaymentSuccessProps {
  lawyer: {
    fee: string;
  };
}

const PaymentSuccess = ({ lawyer }: PaymentSuccessProps) => {
  const navigate = useNavigate();

  const proceedToLawyerChat = () => {
    navigate('/lawyer-chat');
  };

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
};

export default PaymentSuccess;
