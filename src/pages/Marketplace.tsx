
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { lawyers, legalIssueToSpecialization, cities, feeRanges, experienceRanges, type Lawyer } from '@/data/lawyers';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import SpecializationFilter from '@/components/marketplace/SpecializationFilter';
import AdvancedFilters from '@/components/marketplace/AdvancedFilters';
import LawyerCard from '@/components/marketplace/LawyerCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Users, SortAsc, Search } from 'lucide-react';

const Marketplace = () => {
  const navigate = useNavigate();
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedFeeRange, setSelectedFeeRange] = useState<string>('All');
  const [selectedExperienceRange, setSelectedExperienceRange] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('rating');
  
  // Get selected legal issue from localStorage and map to specialization
  const selectedLegalIssue = localStorage.getItem('selectedLegalIssue') || '';

  // Set initial filter based on selected legal issue
  useEffect(() => {
    const matchingSpecialization = legalIssueToSpecialization[selectedLegalIssue];
    if (matchingSpecialization) {
      setSelectedSpecialization(matchingSpecialization);
    }
  }, [selectedLegalIssue]);

  const specializations = ['All', ...Array.from(new Set(lawyers.map(lawyer => lawyer.specialization)))];

  // Filter lawyers based on all criteria
  const filteredLawyers = lawyers.filter(lawyer => {
    // Specialization filter
    if (selectedSpecialization !== 'All' && lawyer.specialization !== selectedSpecialization) {
      return false;
    }
    
    // City filter
    if (selectedCity !== 'All' && lawyer.location !== selectedCity) {
      return false;
    }
    
    // Fee range filter
    if (selectedFeeRange !== 'All') {
      const feeRange = feeRanges.find(range => range.label === selectedFeeRange);
      if (feeRange && (lawyer.fee < feeRange.min || lawyer.fee > feeRange.max)) {
        return false;
      }
    }
    
    // Experience range filter
    if (selectedExperienceRange !== 'All') {
      const expRange = experienceRanges.find(range => range.label === selectedExperienceRange);
      if (expRange) {
        const expYears = parseInt(lawyer.experience.split(' ')[0]);
        if (expYears < expRange.min || expYears > expRange.max) {
          return false;
        }
      }
    }
    
    return true;
  });

  // Sort lawyers
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

  const handleClearFilters = () => {
    setSelectedSpecialization('All');
    setSelectedCity('All');
    setSelectedFeeRange('All');
    setSelectedExperienceRange('All');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <MarketplaceHeader selectedLegalIssue={selectedLegalIssue} />
        
        <SpecializationFilter
          specializations={specializations}
          selectedSpecialization={selectedSpecialization}
          onSpecializationChange={setSelectedSpecialization}
        />

        <AdvancedFilters
          selectedCity={selectedCity}
          selectedFeeRange={selectedFeeRange}
          selectedExperienceRange={selectedExperienceRange}
          onCityChange={setSelectedCity}
          onFeeRangeChange={setSelectedFeeRange}
          onExperienceRangeChange={setSelectedExperienceRange}
          onClearFilters={handleClearFilters}
        />

        {/* Results Header */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-gray-600" />
                <span className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-black">{sortedLawyers.length}</span> lawyer{sortedLawyers.length !== 1 ? 's' : ''}
                  {selectedSpecialization !== 'All' && (
                    <span> for <span className="font-semibold">{selectedSpecialization}</span></span>
                  )}
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
        {sortedLawyers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedLawyers.map((lawyer) => (
              <LawyerCard
                key={lawyer.id}
                lawyer={lawyer}
                onBookNow={handleBookNow}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <Search size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-black mb-2">No lawyers found</h3>
              <p className="text-gray-600 mb-4">
                No lawyers match your current search criteria. Try adjusting your filters.
              </p>
              <Button onClick={handleClearFilters} variant="outline">
                Clear all filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
