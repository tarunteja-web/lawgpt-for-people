
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Bell } from 'lucide-react';
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

  return (
    <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="text-center">
        <div className="flex flex-col items-center mb-4">
          <Avatar className="h-20 w-20 mb-3">
            <AvatarImage src={lawyer.profileImage} alt={lawyer.name} />
            <AvatarFallback className="bg-gray-600 text-white text-lg">
              {lawyer.initials}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <CardTitle className="text-lg text-black mb-1">{lawyer.name}</CardTitle>
            {renderStars(lawyer.rating)}
          </div>
        </div>
        <Badge variant="secondary" className="bg-gray-100 text-gray-800 self-center">
          {lawyer.language}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-gray-600">Specialization</p>
          <p className="font-medium text-black">{lawyer.specialization}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Experience</p>
          <p className="font-medium text-black">{lawyer.experience}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Consultation Fee</p>
            <p className="text-3xl font-bold text-black">₹{lawyer.fee}</p>
            <p className="text-xs text-gray-500">per session</p>
          </div>
        </div>
        
        <Button
          onClick={() => onBookNow(lawyer)}
          className="w-full bg-black hover:bg-gray-800 text-white flex items-center justify-center space-x-2"
        >
          <Bell className="h-4 w-4" />
          <span>Book Consultation</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default LawyerCard;
