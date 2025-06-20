
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Bell, MapPin, GraduationCap, Scale } from 'lucide-react';
import type { Lawyer } from '@/data/lawyers';

interface LawyerCardProps {
  lawyer: Lawyer;
  onBookNow: (lawyer: Lawyer) => void;
}

const LawyerCard = ({ lawyer, onBookNow }: LawyerCardProps) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-green-500';
      case 'busy':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'Available';
      case 'busy':
        return 'Busy';
      case 'offline':
        return 'Offline';
      default:
        return 'Unknown';
    }
  };

  return (
    <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="text-center">
        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            <Avatar className="h-20 w-20 mb-3">
              <AvatarImage src={lawyer.profileImage} alt={lawyer.name} />
              <AvatarFallback className="bg-gray-600 text-white text-lg">
                {lawyer.initials}
              </AvatarFallback>
            </Avatar>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${getAvailabilityColor(lawyer.availability)} border-2 border-white`}></div>
          </div>
          <div className="text-center">
            <CardTitle className="text-lg text-black mb-1">{lawyer.name}</CardTitle>
            {renderStars(lawyer.rating)}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary" className="bg-gray-100 text-gray-800 text-xs">
            {getAvailabilityText(lawyer.availability)}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {lawyer.language}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <div>
            <p className="text-sm text-gray-600">Location</p>
            <p className="font-medium text-black text-sm">{lawyer.location}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Scale className="h-4 w-4 text-gray-500" />
          <div>
            <p className="text-sm text-gray-600">Specialization</p>
            <p className="font-medium text-black text-sm">{lawyer.specialization}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-4 w-4 text-gray-500" />
          <div>
            <p className="text-sm text-gray-600">Experience</p>
            <p className="font-medium text-black text-sm">{lawyer.experience}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-600">{lawyer.qualifications}</p>
          <p className="text-xs text-gray-500">Bar No: {lawyer.barCouncilNo}</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Consultation Fee</p>
            <p className="text-2xl font-bold text-black">₹{lawyer.fee}</p>
            <p className="text-xs text-gray-500">per session</p>
          </div>
        </div>
        
        <Button
          onClick={() => onBookNow(lawyer)}
          disabled={lawyer.availability === 'offline'}
          className={`w-full flex items-center justify-center space-x-2 ${
            lawyer.availability === 'offline' 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-black hover:bg-gray-800'
          } text-white`}
        >
          <Bell className="h-4 w-4" />
          <span>
            {lawyer.availability === 'offline' ? 'Currently Offline' : 'Book Consultation'}
          </span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default LawyerCard;
