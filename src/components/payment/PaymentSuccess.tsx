
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white border border-gray-200 shadow-lg">
        <CardContent className="p-8 space-y-8">
          {/* Success Header */}
          <div className="text-center animate-scale-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6">
              <CheckCircle className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-lg text-gray-600 mb-4">
              Your consultation has been confirmed and paid for
            </p>
            <div className="inline-flex items-center bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
              <span className="text-sm text-blue-700">Amount Paid: </span>
              <span className="text-lg font-bold text-blue-800 ml-1">₹{lawyer.fee}</span>
            </div>
          </div>

          {/* What's Next Section */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">What happens next?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Start Your Consultation</h3>
                  <p className="text-sm text-gray-600">Connect with your lawyer immediately through our secure chat platform</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Schedule Follow-ups</h3>
                  <p className="text-sm text-gray-600">Book additional sessions if needed during your consultation</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Secure & Confidential</h3>
                  <p className="text-sm text-gray-600">All conversations are protected by attorney-client privilege</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={proceedToLawyerChat}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
              size="lg"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Start Consultation Now
            </Button>
            
            <Button 
              onClick={goToMarketplace}
              variant="outline"
              className="w-full py-3 text-gray-700 border-gray-300 hover:bg-gray-50"
              size="lg"
            >
              Back to Marketplace
            </Button>
          </div>

          {/* Support Note */}
          <div className="text-center text-sm text-gray-600 bg-white p-4 rounded-lg border border-gray-200">
            <p>Need help? Our support team is available 24/7 to assist you.</p>
            <p className="mt-1">Email: support@legalapp.com | Phone: +91-XXX-XXX-XXXX</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
