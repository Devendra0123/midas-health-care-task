import React from 'react';
import { Tooltip } from 'antd';
import { SummaryCardData } from '../../types';

interface SummaryCardProps {
  card: SummaryCardData;
}

const SummaryCard: React.FC<SummaryCardProps> = React.memo(({ card }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
      <div className="flex items-center space-x-2">
        {/* Icon */}
        {card.icon && <card.icon className="text-2xl text-primary" />}
        {/* Title */}
        <Tooltip title={card.tooltip}>
          <h3 className="text-sm font-semibold">{card.title}</h3>
        </Tooltip>
      </div>
      {/* Value */}
      <div className="text-2xl font-bold mt-2">{card.value}</div>
      {/* Additional Info */}
      {card.additionalInfo && <div className="text-sm text-gray-400 mt-1">{card.additionalInfo}</div>}
    </div>
  );
});

export default SummaryCard;
