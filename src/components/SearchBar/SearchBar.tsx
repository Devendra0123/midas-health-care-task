import React from 'react';
import { Input } from 'antd';
import {
  SearchOutlined
} from "@ant-design/icons"

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string; 
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder }) => {
  return (
    <div className="mb-4">
      <Input
        placeholder={placeholder || 'Search...'}
        onChange={(e) => onSearch(e.target.value)}
        allowClear
        prefix={<SearchOutlined className='' />}
        className='font-normal py-2'
      />
    </div>
  );
};

export default SearchBar;
