import React from 'react';
import { Button, Tooltip } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, DownloadOutlined, ReloadOutlined } from '@ant-design/icons';

interface ToolbarProps {
  title: string;
  filterVisible: boolean;
  onToggleFilter: () => void;
  onDownload: () => void;
  onResetFilters: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  title,
  filterVisible,
  onToggleFilter,
  onDownload,
  onResetFilters,
}) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
      {/* Section Title */}
      <h2 className="text-lg font-bold flex items-center space-x-2">
        <span>{title}</span>
      </h2>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        {/* Reset Filters */}
        <Tooltip title="Reset Filters">
          <Button
            icon={<ReloadOutlined />}
            onClick={onResetFilters}
            type="default"
          />
        </Tooltip>

        {/* Toggle Filter Button */}
        <Button
          onClick={onToggleFilter}
          icon={filterVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        >
          {filterVisible ? 'Hide Filter' : 'Show Filter'}
        </Button>

        {/* Download Excel Button */}
        <Button onClick={onDownload} icon={<DownloadOutlined />} type="primary">
          Download Excel
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
