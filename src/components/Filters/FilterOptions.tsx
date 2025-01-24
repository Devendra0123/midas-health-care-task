import React from 'react';
import { Select } from 'antd';
import { IoFilterOutline } from "react-icons/io5";

interface FilterOptionProps {
  setFilterOptions: (selectedOptions: string[]) => void;
}

const FilterOptions: React.FC<FilterOptionProps> = ({ setFilterOptions }) => {
  const options = [
    { label: 'Date', value: 'date' },
    { label: 'Doctor', value: 'doctor' },
  ];

  const handleChange = (selectedOptions: string[]) => {
    setFilterOptions(selectedOptions);
  };

  return (
    <div>
      <Select
        mode="multiple"
        prefix={<div className='flex items-center gap-1'><IoFilterOutline /> Filter</div>}
        suffixIcon={null}
        placeholder=""
        onChange={handleChange}
       className='w-max lg:w-full'
        options={options}
        defaultValue={['date', 'doctor']}
      />
    </div>
  );
};

export default FilterOptions;
