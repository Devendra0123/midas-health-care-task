import React from 'react';
import { Tooltip } from 'antd';
import { SummaryCardData } from '../../types';

interface SummaryCardProps {
  card: SummaryCardData;
}

const SummaryCard: React.FC<SummaryCardProps> = React.memo(({ card }) => {
  return (
    <div
     className="bg-white rounded-lg p-4 grid grid-cols-2 border border-slate-300 shadow-none xl:shadow-lg shadow-black/10">
      <div className='h-full flex flex-col justify-between'>
        <div className="flex items-center space-x-2">
          <Tooltip title={card.tooltip}>
            <h3 className="text-sm xl:text-lg font-semibold text-start text-gray-500">{card.title1}</h3>
          </Tooltip>
        </div>

        <div className="text-md xl:text-lg font-bold mt-2 flex items-center gap-2 text-orange/75">
          {card.icon1 && <card.icon1 className="text-xl text-primary " />}
          {card.value1}
        </div>
      </div>

      <div className='h-full flex flex-col justify-between items-end'>
        {
          card.title2 && (
            <div className="flex items-center space-x-2">
              <Tooltip title={card.tooltip}>
                <h3 className="text-sm xl:text-lg font-semibold text-start text-gray-500">{card.title2}</h3>
              </Tooltip>
            </div>
          )
        }

        <div className="text-md xl:text-lg font-bold mt-2 flex items-center gap-2">
          {
           card.additionalInfo && (
            <Tooltip title={card.additionalInfo}>
            {card.icon2 && <card.icon2 className="text-xl text-primary" />}
          </Tooltip>
           )
          }
        
          {card.value2 && card.value2}
        </div>
      </div>
    </div>
  );
});

export default SummaryCard;
