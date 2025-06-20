
import React from 'react';
import { Button } from '@/components/ui/button';

interface SpecializationFilterProps {
  specializations: string[];
  selectedSpecialization: string;
  onSpecializationChange: (specialization: string) => void;
}

const SpecializationFilter = ({ 
  specializations, 
  selectedSpecialization, 
  onSpecializationChange 
}: SpecializationFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {specializations.map((spec) => (
        <Button
          key={spec}
          variant={selectedSpecialization === spec ? "default" : "outline"}
          onClick={() => onSpecializationChange(spec)}
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
  );
};

export default SpecializationFilter;
