
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Bell } from 'lucide-react';
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
}

const Marketplace = () => {
  const navigate = useNavigate();
  
  const lawyers: Lawyer[] = [
    {
      id: '1',
      name: 'Adv. Ravi Kumar',
      rating: 4.8,
      fee: 299,
      language: 'Telugu',
      specialization: 'Family Law',
      experience: '15 years',
      initials: 'RK'
    },
    {
      id: '2',
      name: 'Adv. Priya Sharma',
      rating: 4.9,
      fee: 399,
      language: 'Telugu',
      specialization: 'Property Law',
      experience: '12 years',
      initials: 'PS'
    },
    {
      id: '3',
      name: 'Adv. Suresh Reddy',
      rating: 4.7,
      fee: 349,
      language: 'Telugu',
      specialization: 'Criminal Law',
      experience: '18 years',
      initials: 'SR'
    },
    {
      id: '4',
      name: 'Adv. Lakshmi Devi',
      rating: 4.9,
      fee: 299,
      language: 'Telugu',
      specialization: 'Corporate Law',
      experience: '10 years',
      initials: 'LD'
    },
    {
      id: '5',
      name: 'Adv. Venkat Rao',
      rating: 4.6,
      fee: 449,
      language: 'Telugu',
      specialization: 'Civil Law',
      experience: '20 years',
      initials: 'VR'
    }
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lawyers.map((lawyer) => (
            <Card key={lawyer.id} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${lawyer.initials}`} />
                      <AvatarFallback className="bg-gray-600 text-white">
                        {lawyer.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg text-black">{lawyer.name}</CardTitle>
                      {renderStars(lawyer.rating)}
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-800">{lawyer.language}</Badge>
                </div>
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
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Consultation Fee</p>
                    <p className="text-2xl font-bold text-green-600">₹{lawyer.fee}</p>
                  </div>
                  
                  <Button
                    onClick={() => handleBookNow(lawyer)}
                    className="bg-black hover:bg-gray-800 text-white flex items-center space-x-2"
                  >
                    <Bell className="h-4 w-4" />
                    <span>Book Now</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
