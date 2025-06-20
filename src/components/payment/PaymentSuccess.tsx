
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, MessageSquare, Calendar, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PaymentSuccessProps {
  lawyer: {
    fee: string;
    name?: string;
  };
}

const PaymentSuccess = ({ lawyer }: PaymentSuccessProps) => {
  const navigate = useNavigate();

  const proceedToLawyerChat = () => {
    navigate('/lawyer-chat');
  };

  const goToMarketplace = () => {
    navigate('/marketplace');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white border border-gray-200 shadow-xl">
        <CardContent className="p-8 space-y-8">
          {/* Success Header with gradient background */}
          <div className="text-center animate-scale-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-50 to-green-100 rounded-full mb-6 shadow-lg">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
              Payment Successful!
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Your consultation has been confirmed and paid for
            </p>
            <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg px-4 py-2 shadow-sm">
              <span className="text-sm text-blue-700">Amount Paid: </span>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent ml-1">
                ₹{lawyer.fee}
              </span>
            </div>
          </div>

          {/* What's Next Section with gradient */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4 text-center">
              What happens next?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-sm">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Start Your Consultation</h3>
                  <p className="text-sm text-gray-600">Connect with your lawyer immediately through our secure chat platform</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-sm">
                  <Calendar className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Schedule Follow-ups</h3>
                  <p className="text-sm text-gray-600">Book additional sessions if needed during your consultation</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-sm">
                  <Shield className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Secure & Confidential</h3>
                  <p className="text-sm text-gray-600">All conversations are protected by attorney-client privilege</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons with gradients */}
          <div className="space-y-3">
            <Button 
              onClick={proceedToLawyerChat}
              className="w-full bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white py-3 text-lg font-medium shadow-lg transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Start Consultation Now
            </Button>
            
            <Button 
              onClick={goToMarketplace}
              variant="outline"
              className="w-full py-3 text-gray-700 border-2 border-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white shadow-sm transition-all duration-300"
              size="lg"
            >
              Back to Marketplace
            </Button>
          </div>

          {/* Support Note with gradient */}
          <div className="text-center text-sm text-gray-600 bg-gradient-to-r from-white to-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
            <p className="font-medium">Need help? Our support team is available 24/7 to assist you.</p>
            <p className="mt-1">Email: support@legalapp.com | Phone: +91-XXX-XXX-XXXX</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
