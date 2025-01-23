import React, { useCallback } from 'react';
import { DatePicker, Select, Button } from 'antd';
import { FilterState, Doctor } from '../../types';

interface FilterSectionProps {
  filters: FilterState; 
  onFilterChange: (filters: FilterState) => void; 
  activeTab: string; 
  doctors: Doctor[]; 
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  onFilterChange,
  activeTab,
  doctors,
}) => {
  // Handle date change
  const handleDateChange = useCallback(
    (type: 'fromDate' | 'toDate', value: any) => {
      onFilterChange({
        ...filters,
        [type]: value ? value : undefined, 
      });
    },
    [filters, onFilterChange]
  );

  // Handle doctor selection
  const handleDoctorChange = useCallback(
    (value: number | undefined) => {
      onFilterChange({
        ...filters,
        doctorId: value,
      });
    },
    [filters, onFilterChange]
  );

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold mb-4">Filters for {activeTab}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* From Date */}
        <DatePicker
          placeholder="From Date"
          value={filters.fromDate ? filters.fromDate : null}
          onChange={(value) => handleDateChange('fromDate', value)}
          className="w-full"
        />

        {/* To Date */}
        <DatePicker
          placeholder="To Date"
          value={filters.toDate ? filters.toDate : null}
          onChange={(value) => handleDateChange('toDate', value)}
          className="w-full"
        />

        {/* Doctor Name */}
        <Select
          placeholder="Select Doctor"
          options={doctors.map((doctor) => ({
            label: doctor.name,
            value: doctor.id,
          }))}
          value={filters.doctorId}
          onChange={handleDoctorChange}
          allowClear
          className="w-full"
        />

      </div>
    </div>
  );
};

export default FilterSection;
