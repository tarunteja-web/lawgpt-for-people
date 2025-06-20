
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { lawyers, legalIssueToSpecialization, type Lawyer } from '@/data/lawyers';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import SpecializationFilter from '@/components/marketplace/SpecializationFilter';
import LawyerCard from '@/components/marketplace/LawyerCard';

const Marketplace = () => {
  const navigate = useNavigate();
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('All');
  
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

  const filteredLawyers = selectedSpecialization === 'All' 
    ? lawyers 
    : lawyers.filter(lawyer => lawyer.specialization === selectedSpecialization);

  const handleBookNow = (lawyer: Lawyer) => {
    localStorage.setItem('selectedLawyer', JSON.stringify(lawyer));
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <MarketplaceHeader selectedLegalIssue={selectedLegalIssue} />
        
        <SpecializationFilter
          specializations={specializations}
          selectedSpecialization={selectedSpecialization}
          onSpecializationChange={setSelectedSpecialization}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLawyers.map((lawyer) => (
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
