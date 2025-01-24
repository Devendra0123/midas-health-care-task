import React, { useState } from 'react';
import { Button, Modal, Spin } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { IoFilterOutline } from "react-icons/io5";
import { LuEyeClosed } from "react-icons/lu";
import FilterOptionWithReset from '../Filters/FilterOptionWithReset';

interface ToolbarProps {
  title: string;
  titleIcon: React.ReactNode;
  filterVisible: boolean;
  onToggleFilter: () => void;
  onDownload: () => void;
  onResetFilters: () => void;
  setFilterOptions: (selectedOptions: string[]) => void;
  setFilterModalDisplay: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  title,
  titleIcon,
  filterVisible,
  onToggleFilter,
  onDownload,
  onResetFilters,
  setFilterOptions,
  setFilterModalDisplay
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadClick = () => {
    setIsModalVisible(true); 
  };

  const handleModalOk = () => {
    setIsDownloading(true); 
    setTimeout(() => {
      onDownload(); 
      setIsDownloading(false); 
      setIsModalVisible(false); 
    }, 2000);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false); 
  };

  return (
    <div className="w-full flex justify-between items-center pt-2 pb-3 rounded-md border-b">
      <div className="flex items-center space-x-4">
        {/* Section Title */}
        <h2 className="text-lg text-teal font-bold flex items-center space-x-2">
          {titleIcon}
          <span>{title}</span>
        </h2>

        <div className="hidden lg:flex items-center space-x-2 md:space-x-4">
          <FilterOptionWithReset onResetFilters={onResetFilters} setFilterOptions={setFilterOptions} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 md:space-x-4">
        {/* Toggle Filter Button */}
        <Button
          className="hidden lg:flex"
          onClick={onToggleFilter}
          icon={filterVisible ? <LuEyeClosed /> : <EyeOutlined />}
        >
          {filterVisible ? 'Hide Filter' : 'Show Filter'}
        </Button>

        {/* Download Excel Button */}
        <Button
          onClick={handleDownloadClick}
          icon={<img src="/assets/icons/excel.svg" alt="excel icon" className="w-5 h-5" />}
        >
          <span className="hidden lg:flex">Download Excel</span>
        </Button>

        {/* Filter Button for Small Screen */}
        <Button
          onClick={setFilterModalDisplay}
          icon={<IoFilterOutline />}
          className="lg:hidden flex items-center gap-1"
        >
          Filter
        </Button>
      </div>

      {/* Confirmation Modal */}
      <Modal
        title="Download Confirmation"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={isDownloading ? <Spin size="small" className='text-white' /> : "Yes"} 
        cancelText="No"
        closable={!isDownloading}
        maskClosable={!isDownloading}
      >
        {isDownloading ? (
          <div className="flex justify-center items-center">
            <Spin size="large" />
          </div>
        ) : (
          <p>Do you want to download the Excel sheet?</p>
        )}
      </Modal>
    </div>
  );
};

export default Toolbar;
