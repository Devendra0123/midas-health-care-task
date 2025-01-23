import React from 'react';
import { Input } from 'antd';

interface SearchBarProps {
  onSearch: (query: string) => void; // Callback function for search
  placeholder?: string; // Placeholder text
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder }) => {
  return (
    <div className="mb-4">
      <Input
        placeholder={placeholder || 'Search...'}
        onChange={(e) => onSearch(e.target.value)} // Trigger search on input change
        allowClear
        prefix={<i className="fas fa-search" />} // Optional search icon
      />
    </div>
  );
};

export default SearchBar;
