
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smartphone } from 'lucide-react';

interface UPIPaymentProps {
  showQR: boolean;
  onGenerateQR: () => void;
}

const UPIPayment = ({ showQR, onGenerateQR }: UPIPaymentProps) => {
  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardContent className="p-6">
        {!showQR ? (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Smartphone className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">UPI Payment</h3>
              <p className="text-gray-600 text-sm mb-4">
                Scan QR code with any UPI app to complete payment
              </p>
            </div>
            <Button 
              onClick={onGenerateQR}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
            >
              Generate QR Code
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-dashed border-blue-300 mx-auto rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <div className="text-xs text-gray-400">QR Code</div>
                </div>
                <div className="text-xs text-gray-500">Scan to Pay</div>
              </div>
            </div>
            <div className="animate-pulse">
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Processing payment...</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UPIPayment;
