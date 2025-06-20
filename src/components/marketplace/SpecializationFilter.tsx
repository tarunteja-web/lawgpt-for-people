
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Scale } from 'lucide-react';

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
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Scale size={16} className="text-gray-600" />
          <h3 className="font-medium text-gray-800">Practice Areas</h3>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {specializations.map((spec) => (
            <Button
              key={spec}
              variant={selectedSpecialization === spec ? "default" : "outline"}
              onClick={() => onSpecializationChange(spec)}
              size="sm"
              className={`text-xs md:text-sm ${
                selectedSpecialization === spec 
                  ? 'bg-black text-white hover:bg-gray-800 shadow-md' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
              } transition-all duration-200`}
            >
              {spec}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SpecializationFilter;
