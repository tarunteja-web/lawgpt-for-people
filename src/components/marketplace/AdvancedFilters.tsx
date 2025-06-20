
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cities, feeRanges, experienceRanges } from '@/data/lawyers';

interface AdvancedFiltersProps {
  selectedCity: string;
  selectedFeeRange: string;
  selectedExperienceRange: string;
  onCityChange: (city: string) => void;
  onFeeRangeChange: (range: string) => void;
  onExperienceRangeChange: (range: string) => void;
  onClearFilters: () => void;
}

const AdvancedFilters = ({
  selectedCity,
  selectedFeeRange,
  selectedExperienceRange,
  onCityChange,
  onFeeRangeChange,
  onExperienceRangeChange,
  onClearFilters
}: AdvancedFiltersProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <Select value={selectedCity} onValueChange={onCityChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fee Range
          </label>
          <Select value={selectedFeeRange} onValueChange={onFeeRangeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select fee range" />
            </SelectTrigger>
            <SelectContent>
              {feeRanges.map((range) => (
                <SelectItem key={range.label} value={range.label}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience
          </label>
          <Select value={selectedExperienceRange} onValueChange={onExperienceRangeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              {experienceRanges.map((range) => (
                <SelectItem key={range.label} value={range.label}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="w-full"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;
