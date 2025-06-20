
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Video, VideoOff, Mic, MicOff, PhoneOff, Camera, CameraOff, ArrowLeft } from 'lucide-react';

const LawyerVideoCall = () => {
  const navigate = useNavigate();
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
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
    console.log('Starting video call with lawyer...');
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
    console.log('Ending video call...');
    navigate('/lawyer-chat');
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    console.log(isMuted ? 'Unmuted' : 'Muted');
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    console.log(isVideoOn ? 'Video off' : 'Video on');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700">
        <Button
          onClick={() => navigate('/lawyer-chat')}
          variant="ghost"
          className="flex items-center gap-2 text-white hover:bg-gray-800"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Chat
        </Button>
        <h1 className="text-xl font-semibold">Video Call</h1>
        <div className="text-sm text-gray-300">
          {isCallActive && formatDuration(callDuration)}
        </div>
      </div>

      {/* Video Call Interface */}
      {!isCallActive ? (
        /* Pre-call Screen */
        <div className="flex-1 flex items-center justify-center p-6">
          <Card className="w-full max-w-md bg-gray-900 border-gray-700 shadow-lg">
            <CardContent className="p-8 text-center space-y-6">
              {/* Lawyer Info */}
              <div className="space-y-4">
                <div className="w-32 h-32 mx-auto bg-gray-700 rounded-full flex items-center justify-center">
                  <div className="text-4xl font-bold text-gray-300">
                    {lawyer.name?.charAt(0) || 'L'}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white">{lawyer.name || 'Lawyer'}</h2>
                  <p className="text-gray-300">{lawyer.specialization || 'Legal Expert'}</p>
                  <p className="text-gray-400">{lawyer.experience || '10+ years experience'}</p>
                </div>
              </div>

              <div className="text-gray-300">Ready for video call</div>

              <Button
                onClick={handleStartCall}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg"
              >
                <Video className="h-6 w-6 mr-2" />
                Start Video Call
              </Button>

              <div className="text-sm text-gray-400 space-y-1">
                <p>HD video call</p>
                <p>End-to-end encrypted</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Active Call Screen */
        <div className="flex-1 relative">
          {/* Main Video Area */}
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
            {/* Lawyer Video */}
            <div className="w-full h-full bg-gray-800 flex items-center justify-center relative">
              <div className="text-center">
                <div className="w-48 h-48 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <div className="text-6xl font-bold text-gray-300">
                    {lawyer.name?.charAt(0) || 'L'}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white">{lawyer.name || 'Lawyer'}</h3>
                <p className="text-gray-300">{lawyer.specialization || 'Legal Expert'}</p>
              </div>
              
              {/* Connection Status */}
              <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                Connected • {formatDuration(callDuration)}
              </div>
            </div>

            {/* Self Video (Picture-in-Picture) */}
            <div className="absolute bottom-20 right-4 w-40 h-32 bg-gray-700 rounded-lg border border-gray-600 flex items-center justify-center">
              {isVideoOn ? (
                <div className="text-center text-gray-300">
                  <Camera className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-xs">You</div>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <CameraOff className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-xs">Video Off</div>
                </div>
              )}
            </div>
          </div>

          {/* Control Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gray-900 p-4">
            <div className="flex justify-center gap-4">
              <Button
                onClick={toggleMute}
                variant="ghost"
                size="lg"
                className={`rounded-full w-14 h-14 ${
                  isMuted 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
              </Button>
              
              <Button
                onClick={toggleVideo}
                variant="ghost"
                size="lg"
                className={`rounded-full w-14 h-14 ${
                  !isVideoOn 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
              </Button>

              <Button
                onClick={handleEndCall}
                className="rounded-full w-14 h-14 bg-red-600 hover:bg-red-700 text-white"
              >
                <PhoneOff className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LawyerVideoCall;
