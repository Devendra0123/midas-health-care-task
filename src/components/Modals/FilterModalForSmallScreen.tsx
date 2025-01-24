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
    setLocalFilters(updatedFilters);
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
    handleCancel(); 
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
          filters={filters} 
          onFilterChange={(data)=> handleFilterChange(data)} 
          activeTab={activeTab}
          doctors={doctors}
          filterOptions={filterOptions}
        />
      </div>
    </Modal>
  );
};

export default FilterModalForSmallScreen;
