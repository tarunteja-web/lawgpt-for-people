
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, GraduationCap, Scale, Phone, Clock, Award } from 'lucide-react';
import type { Lawyer } from '@/data/lawyers';

interface LawyerCardProps {
  lawyer: Lawyer;
  onBookNow: (lawyer: Lawyer) => void;
}

const LawyerCard = ({ lawyer, onBookNow }: LawyerCardProps) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-xs font-medium text-gray-700">{rating}</span>
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
        return 'Available Now';
      case 'busy':
        return 'In Session';
      case 'offline':
        return 'Offline';
      default:
        return 'Unknown';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-white via-gray-50 to-gray-100 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <CardContent className="p-0">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 p-4 border-b">
          <div className="flex items-start gap-3">
            <div className="relative">
              <Avatar className="h-14 w-14 ring-2 ring-white shadow-md">
                <AvatarImage src={lawyer.profileImage} alt={lawyer.name} />
                <AvatarFallback className="bg-gradient-to-br from-gray-600 to-black text-white text-sm font-semibold">
                  {lawyer.initials}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${getAvailabilityColor(lawyer.availability)} border-2 border-white shadow-sm`}></div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-black text-lg leading-tight truncate">{lawyer.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                {renderStars(lawyer.rating)}
                <Badge variant="outline" className="text-xs px-2 py-0.5 bg-gradient-to-r from-gray-50 to-white border-gray-300">
                  {lawyer.language}
                </Badge>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Clock size={12} className="text-gray-500" />
                <span className="text-xs text-gray-600">{getAvailabilityText(lawyer.availability)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          {/* Location & Specialization */}
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Location</p>
                <p className="font-medium text-black text-sm truncate">{lawyer.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Specialization</p>
                <p className="font-medium text-black text-sm truncate">{lawyer.specialization}</p>
              </div>
            </div>
          </div>

          {/* Experience & Qualifications */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Experience</span>
            </div>
            <p className="text-sm font-semibold text-black mb-1">{lawyer.experience}</p>
            <p className="text-xs text-gray-600 line-clamp-2">{lawyer.qualifications}</p>
            <p className="text-xs text-gray-500 mt-1">Bar No: {lawyer.barCouncilNo}</p>
          </div>

          {/* Courts */}
          {lawyer.courtsOfPractice && lawyer.courtsOfPractice.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-4 w-4 text-gray-500" />
                <span className="text-xs text-gray-500">Practice Courts</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {lawyer.courtsOfPractice.slice(0, 2).map((court, index) => (
                  <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5 bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300">
                    {court}
                  </Badge>
                ))}
                {lawyer.courtsOfPractice.length > 2 && (
                  <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300">
                    +{lawyer.courtsOfPractice.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Fee Section */}
          <div className="bg-gradient-to-r from-black via-gray-800 to-gray-900 text-white rounded-lg p-3 shadow-lg">
            <div className="text-center">
              <p className="text-xs text-gray-300 mb-1">Consultation Fee</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">₹{lawyer.fee}</span>
                <span className="text-xs text-gray-300">per session</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => onBookNow(lawyer)}
            disabled={lawyer.availability === 'offline'}
            className={`w-full flex items-center justify-center gap-2 ${
              lawyer.availability === 'offline' 
                ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-black via-gray-800 to-gray-900 hover:from-gray-800 hover:via-black hover:to-gray-800'
            } text-white py-3 shadow-lg transition-all duration-300`}
          >
            <Phone className="h-4 w-4" />
            <span className="font-medium">
              {lawyer.availability === 'offline' ? 'Currently Offline' : 'Book Consultation'}
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LawyerCard;
