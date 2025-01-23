import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import FilterOptionWithReset from '../Filters/FilterOptionWithReset';
import FilterSection from '../Filters/FilterSection';
import { Doctor, FilterState } from '../../types';

interface FilterModalForSmallScreenProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  onResetFilters: () => void;
  setFilterOptions: (selectedOptions: string[]) => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  activeTab: string;
  doctors: Doctor[];
  filterOptions: string[];
}

const FilterModalForSmallScreen: React.FC<FilterModalForSmallScreenProps> = ({
  isModalOpen,
  handleCancel,
  onResetFilters,
  setFilterOptions,
  filters,
  onFilterChange,
  activeTab,
  doctors,
  filterOptions,
}) => {
  // Local state to store filter changes temporarily
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  const handleFilterChange = (updatedFilters: FilterState) => {
    setLocalFilters(updatedFilters); // Update local filters
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters); // Apply filters only when "Filter Data" is clicked
    handleCancel(); // Close the modal
  };

  return (
    <Modal
      title="Filter Data"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="filter" onClick={handleApplyFilters} className="bg-purple text-white">
          Filter Data
        </Button>,
      ]}
    >
      <div className="flex items-center space-x-4">
        <FilterOptionWithReset onResetFilters={onResetFilters} setFilterOptions={setFilterOptions} />
      </div>

      <div>
        <FilterSection
          filters={localFilters} // Pass localFilters instead of global filters
          onFilterChange={handleFilterChange} // Update localFilters instead of triggering global filter change
          activeTab={activeTab}
          doctors={doctors}
          filterOptions={filterOptions}
        />
      </div>
    </Modal>
  );
};

export default FilterModalForSmallScreen;
