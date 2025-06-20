
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Lawyer {
  id: string;
  name: string;
  rating: number;
  fee: number;
  language: string;
  specialization: string;
  experience: string;
  initials: string;
  profileImage: string;
}

const Marketplace = () => {
  const navigate = useNavigate();
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('All');
  
  const lawyers: Lawyer[] = [
    {
      id: '1',
      name: 'Adv. Ravi Kumar',
      rating: 4.8,
      fee: 299,
      language: 'Telugu',
      specialization: 'Family Law',
      experience: '15 years',
      initials: 'RK',
      profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Adv. Priya Sharma',
      rating: 4.9,
      fee: 399,
      language: 'Telugu',
      specialization: 'Property Law',
      experience: '12 years',
      initials: 'PS',
      profileImage: 'https://images.unsplash.com/photo-1594736022-d5d88e9218df?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Adv. Suresh Reddy',
      rating: 4.7,
      fee: 349,
      language: 'Telugu',
      specialization: 'Criminal Law',
      experience: '18 years',
      initials: 'SR',
      profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '4',
      name: 'Adv. Lakshmi Devi',
      rating: 4.9,
      fee: 299,
      language: 'Telugu',
      specialization: 'Corporate Law',
      experience: '10 years',
      initials: 'LD',
      profileImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '5',
      name: 'Adv. Venkat Rao',
      rating: 4.6,
      fee: 449,
      language: 'Telugu',
      specialization: 'Civil Law',
      experience: '20 years',
      initials: 'VR',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '6',
      name: 'Adv. Meera Patel',
      rating: 4.8,
      fee: 329,
      language: 'Telugu',
      specialization: 'Family Law',
      experience: '8 years',
      initials: 'MP',
      profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const specializations = ['All', ...Array.from(new Set(lawyers.map(lawyer => lawyer.specialization)))];

  const filteredLawyers = selectedSpecialization === 'All' 
    ? lawyers 
    : lawyers.filter(lawyer => lawyer.specialization === selectedSpecialization);

  const handleBookNow = (lawyer: Lawyer) => {
    localStorage.setItem('selectedLawyer', JSON.stringify(lawyer));
    navigate('/payment');
  };

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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">
            Connect with Expert Lawyers
          </h1>
          <p className="text-lg text-gray-600">
            Choose from our verified Telugu-speaking legal experts
          </p>
        </div>

        {/* Specialization Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {specializations.map((spec) => (
            <Button
              key={spec}
              variant={selectedSpecialization === spec ? "default" : "outline"}
              onClick={() => setSelectedSpecialization(spec)}
              className={`${
                selectedSpecialization === spec 
                  ? 'bg-black text-white hover:bg-gray-800' 
                  : 'bg-white text-black border-gray-300 hover:bg-gray-50'
              }`}
            >
              {spec}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLawyers.map((lawyer) => (
            <Card key={lawyer.id} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
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
                <Badge variant="secondary" className="bg-gray-100 text-gray-800 self-center">{lawyer.language}</Badge>
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
                  onClick={() => handleBookNow(lawyer)}
                  className="w-full bg-black hover:bg-gray-800 text-white flex items-center justify-center space-x-2"
                >
                  <Bell className="h-4 w-4" />
                  <span>Book Consultation</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
