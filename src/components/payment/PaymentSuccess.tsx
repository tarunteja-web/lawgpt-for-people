
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

const PaymentSuccess = ({
  lawyer
}: PaymentSuccessProps) => {
  const navigate = useNavigate();

  const proceedToLawyerChat = () => {
    navigate('/lawyer-chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-3 sm:p-4">
      <Card className="w-full max-w-xl sm:max-w-2xl bg-white border border-gray-200 shadow-xl">
        <CardContent className="p-6 sm:p-8 space-y-6 sm:space-y-8">
          {/* Success Header with gradient background */}
          <div className="text-center animate-scale-in">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-50 to-green-100 rounded-full mb-4 sm:mb-6 shadow-lg">
              <CheckCircle className="h-8 w-8 sm:h-12 sm:w-12 text-green-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
              Payment Successful!
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-4">
              Your consultation has been confirmed and paid for
            </p>
            <div className="inline-flex items-center bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg px-3 sm:px-4 py-2 shadow-sm">
              <span className="text-sm text-gray-700">Amount Paid: </span>
              <span className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent ml-1">
                ₹{lawyer.fee}
              </span>
            </div>
          </div>

          {/* What's Next Section with gradient */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 sm:p-6 border border-gray-200 shadow-sm">
            <h2 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3 sm:mb-4 text-center">
              What happens next?
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-sm">
                  <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm sm:text-base">Start Your Consultation</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Connect with your lawyer immediately through our secure chat platform</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-sm">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm sm:text-base">Schedule Follow-ups</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Book additional sessions if needed during your consultation</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-sm">
                  <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm sm:text-base">Secure & Confidential</h3>
                  <p className="text-xs sm:text-sm text-gray-600">All conversations are protected by attorney-client privilege</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button with gradient */}
          <div>
            <Button 
              onClick={proceedToLawyerChat} 
              className="w-full bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white py-3 sm:py-4 text-base sm:text-lg font-medium shadow-lg transition-all duration-300 transform hover:scale-105 h-12 sm:h-14" 
              size="lg"
            >
              <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Start Consultation Now
            </Button>
          </div>

          {/* Support Note with gradient */}
          <div className="text-center text-xs sm:text-sm text-gray-600 bg-gradient-to-r from-white to-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm">
            <p className="font-medium">Need help? Our support team is available 24/7 to assist you.</p>
            <p className="mt-1">Email: support@legalapp.com | Phone: +91-XXX-XXX-XXXX</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
