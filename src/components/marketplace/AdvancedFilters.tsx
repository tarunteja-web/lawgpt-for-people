
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { cities, feeRanges, experienceRanges } from '@/data/lawyers';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();

  const hasActiveFilters = selectedCity !== 'All' || selectedFeeRange !== 'All' || selectedExperienceRange !== 'All';

  const FilterContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <Select value={selectedCity} onValueChange={onCityChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Cities</SelectItem>
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
            <SelectValue placeholder="Any fee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Any Fee Range</SelectItem>
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
            <SelectValue placeholder="Any experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">Any Experience</SelectItem>
            {experienceRanges.map((range) => (
              <SelectItem key={range.label} value={range.label}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-end">
        <Button
          variant="outline"
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
          className="w-full flex items-center gap-2"
        >
          <X size={16} />
          Clear All
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Card className="mb-6">
        <CardContent className="p-4">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-2">
              <Filter size={16} />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </div>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
          
          {isExpanded && <FilterContent />}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={16} className="text-gray-600" />
          <h3 className="font-medium text-gray-800">Filter Lawyers</h3>
          {hasActiveFilters && (
            <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
              {[selectedCity !== 'All', selectedFeeRange !== 'All', selectedExperienceRange !== 'All'].filter(Boolean).length} active
            </span>
          )}
        </div>
        <FilterContent />
      </CardContent>
    </Card>
  );
};

export default AdvancedFilters;
