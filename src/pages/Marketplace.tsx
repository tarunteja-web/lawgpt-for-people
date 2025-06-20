
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
      experience: '15 years'
    },
    {
      id: '2',
      name: 'Adv. Priya Sharma',
      rating: 4.9,
      fee: 399,
      language: 'Telugu',
      specialization: 'Property Law',
      experience: '12 years'
    },
    {
      id: '3',
      name: 'Adv. Suresh Reddy',
      rating: 4.7,
      fee: 349,
      language: 'Telugu',
      specialization: 'Criminal Law',
      experience: '18 years'
    },
    {
      id: '4',
      name: 'Adv. Lakshmi Devi',
      rating: 4.9,
      fee: 299,
      language: 'Telugu',
      specialization: 'Corporate Law',
      experience: '10 years'
    },
    {
      id: '5',
      name: 'Adv. Venkat Rao',
      rating: 4.6,
      fee: 449,
      language: 'Telugu',
      specialization: 'Civil Law',
      experience: '20 years'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Connect with Expert Lawyers
          </h1>
          <p className="text-lg text-gray-600">
            Choose from our verified Telugu-speaking legal experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lawyers.map((lawyer) => (
            <Card key={lawyer.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{lawyer.name}</CardTitle>
                  <Badge variant="secondary">{lawyer.language}</Badge>
                </div>
                {renderStars(lawyer.rating)}
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Specialization</p>
                  <p className="font-medium">{lawyer.specialization}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Experience</p>
                  <p className="font-medium">{lawyer.experience}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Consultation Fee</p>
                    <p className="text-2xl font-bold text-green-600">₹{lawyer.fee}</p>
                  </div>
                  
                  <Button
                    onClick={() => handleBookNow(lawyer)}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
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
