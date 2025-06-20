
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lawyers, type Lawyer } from '@/data/lawyers';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import LawyerCard from '@/components/marketplace/LawyerCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Users, SortAsc, Search } from 'lucide-react';

const Marketplace = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<string>('rating');
  
  // Get selected legal issue from localStorage
  const selectedLegalIssue = localStorage.getItem('selectedLegalIssue') || '';

  // Sort lawyers without any filtering
  const sortedLawyers = [...lawyers].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'experience':
        const aExp = parseInt(a.experience.split(' ')[0]);
        const bExp = parseInt(b.experience.split(' ')[0]);
        return bExp - aExp;
      case 'fee_low':
        return a.fee - b.fee;
      case 'fee_high':
        return b.fee - a.fee;
      default:
        return 0;
    }
  });

  const handleBookNow = (lawyer: Lawyer) => {
    localStorage.setItem('selectedLawyer', JSON.stringify(lawyer));
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <MarketplaceHeader selectedLegalIssue={selectedLegalIssue} />

        {/* Results Header */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-gray-600" />
                <span className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-black">{sortedLawyers.length}</span> lawyer{sortedLawyers.length !== 1 ? 's' : ''} available
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <SortAsc size={16} className="text-gray-600" />
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
                    <SelectItem value="fee_low">Fee: Low to High</SelectItem>
                    <SelectItem value="fee_high">Fee: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lawyers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedLawyers.map((lawyer) => (
            <LawyerCard
              key={lawyer.id}
              lawyer={lawyer}
              onBookNow={handleBookNow}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
