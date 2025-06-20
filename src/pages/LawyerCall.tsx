
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, ArrowLeft } from 'lucide-react';

const LawyerCall = () => {
  const navigate = useNavigate();
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const lawyer = JSON.parse(localStorage.getItem('selectedLawyer') || '{}');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = () => {
    setIsCallActive(true);
    console.log('Starting call with lawyer...');
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
    console.log('Ending call...');
    navigate('/lawyer-chat');
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    console.log(isMuted ? 'Unmuted' : 'Muted');
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
    console.log(isSpeakerOn ? 'Speaker off' : 'Speaker on');
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <Button
          onClick={() => navigate('/lawyer-chat')}
          variant="ghost"
          className="flex items-center gap-2 text-black hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Chat
        </Button>
        <h1 className="text-xl font-semibold">Voice Call</h1>
        <div></div>
      </div>

      {/* Main Call Interface */}
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-white border-gray-300 shadow-lg">
          <CardContent className="p-8 text-center space-y-6">
            {/* Lawyer Info */}
            <div className="space-y-4">
              <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                <div className="text-4xl font-bold text-gray-600">
                  {lawyer.name?.charAt(0) || 'L'}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-black">{lawyer.name || 'Lawyer'}</h2>
                <p className="text-gray-600">{lawyer.specialization || 'Legal Expert'}</p>
                <p className="text-gray-500">{lawyer.experience || '10+ years experience'}</p>
              </div>
            </div>

            {/* Call Status */}
            <div className="space-y-2">
              {isCallActive ? (
                <>
                  <div className="text-green-600 font-medium">Connected</div>
                  <div className="text-lg font-mono text-black">{formatDuration(callDuration)}</div>
                </>
              ) : (
                <div className="text-gray-600">Ready to call</div>
              )}
            </div>

            {/* Call Controls */}
            <div className="space-y-4">
              {!isCallActive ? (
                <Button
                  onClick={handleStartCall}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg"
                >
                  <Phone className="h-6 w-6 mr-2" />
                  Start Call
                </Button>
              ) : (
                <div className="space-y-4">
                  {/* Control Buttons */}
                  <div className="flex justify-center gap-4">
                    <Button
                      onClick={toggleMute}
                      variant="outline"
                      size="lg"
                      className={`${
                        isMuted 
                          ? 'bg-red-100 border-red-300 text-red-600 hover:bg-red-200' 
                          : 'bg-white border-gray-300 text-black hover:bg-gray-100'
                      }`}
                    >
                      {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                    </Button>
                    
                    <Button
                      onClick={toggleSpeaker}
                      variant="outline"
                      size="lg"
                      className={`${
                        isSpeakerOn 
                          ? 'bg-blue-100 border-blue-300 text-blue-600 hover:bg-blue-200' 
                          : 'bg-white border-gray-300 text-black hover:bg-gray-100'
                      }`}
                    >
                      {isSpeakerOn ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
                    </Button>
                  </div>

                  {/* End Call Button */}
                  <Button
                    onClick={handleEndCall}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg"
                  >
                    <PhoneOff className="h-6 w-6 mr-2" />
                    End Call
                  </Button>
                </div>
              )}
            </div>

            {/* Call Info */}
            <div className="text-sm text-gray-500 space-y-1">
              <p>High quality voice call</p>
              <p>End-to-end encrypted</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LawyerCall;
