
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lawyers, type Lawyer, legalIssueToSpecialization } from '@/data/lawyers';
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

  // Filter lawyers based on selected legal issue
  const getFilteredLawyers = () => {
    if (!selectedLegalIssue) {
      return lawyers; // Show all lawyers if no issue selected
    }

    // Get the specialization that matches the selected legal issue
    const requiredSpecialization = legalIssueToSpecialization[selectedLegalIssue];
    
    if (!requiredSpecialization) {
      return lawyers; // Show all lawyers if no matching specialization found
    }

    // Filter lawyers by specialization
    return lawyers.filter(lawyer => 
      lawyer.specialization === requiredSpecialization
    );
  };

  // Get filtered lawyers and then sort them
  const filteredLawyers = getFilteredLawyers();
  
  const sortedLawyers = [...filteredLawyers].sort((a, b) => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <div className="container mx-auto px-4 py-6">
        <MarketplaceHeader selectedLegalIssue={selectedLegalIssue} />

        {/* Results Header */}
        <Card className="mb-6 bg-gradient-to-r from-white to-gray-50 border border-gray-200 shadow-lg">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-gray-600" />
                <span className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-black">{sortedLawyers.length}</span> {selectedLegalIssue ? `${selectedLegalIssue.toLowerCase()}` : ''} lawyer{sortedLawyers.length !== 1 ? 's' : ''} available
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <SortAsc size={16} className="text-gray-600" />
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-gradient-to-r from-gray-50 to-white border-gray-300">
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

        {/* No lawyers found message */}
        {sortedLawyers.length === 0 && (
          <Card className="mb-6 bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300">
            <CardContent className="p-8 text-center">
              <Search size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No {selectedLegalIssue} lawyers found
              </h3>
              <p className="text-gray-500">
                We don't have any lawyers specializing in {selectedLegalIssue} at the moment. Please try again later or contact support.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Lawyers Grid */}
        {sortedLawyers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedLawyers.map((lawyer) => (
              <LawyerCard
                key={lawyer.id}
                lawyer={lawyer}
                onBookNow={handleBookNow}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
