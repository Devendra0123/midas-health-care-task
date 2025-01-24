import React, { useCallback } from 'react';
import { DatePicker, Select } from 'antd';
import { FilterState, Doctor } from '../../types';

interface FilterSectionProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  activeTab: string;
  doctors: Doctor[];
  filterOptions: string[]
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  onFilterChange,
  activeTab,
  doctors,
  filterOptions
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
    <>
      {
        filterOptions.length > 0 && (
          <div className="mb-6 py-2">
            <h2 className="text-sm font-medium mb-2 text-start text-gray-500">Filters:</h2>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:space-x-4">

              {
                filterOptions.includes('date') && (
                  <div className='w-full'>
                    <p className='text-start text-sm'>
                      Period
                    </p>

                    <div className='w-full grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 space-x-2 md:space-x-4'>
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
                    </div>
                  </div>
                )
              }

              {
                filterOptions.includes('doctor') && (
                  <div className=''>
                    <p className='text-start text-sm'>
                      Filter Via Doctor
                    </p>

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
                      className="w-full text-start"
                    />
                  </div>
                )
              }
            </div>
          </div>
        )
      }

    </>

  );
};

export default FilterSection;
