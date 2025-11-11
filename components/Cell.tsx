import React from 'react';
import { TETROMINOS } from '../gameHelpers';

interface CellProps {
  type: string | number;
}

const Cell: React.FC<CellProps> = ({ type }) => {
  const color = TETROMINOS[type as keyof typeof TETROMINOS]?.color || '0,0,0';
  const isOccupied = type !== 0;

  const cellStyle = {
    backgroundColor: `rgba(${color}, ${isOccupied ? 0.8 : 0})`,
    border: isOccupied ? `4px solid rgba(${color}, 1)` : 'none',
    borderTopColor: `rgba(${color}, 1)`,
    borderRightColor: `rgba(${color}, 1)`,
    borderBottomColor: `rgba(${color}, 0.3)`,
    borderLeftColor: `rgba(${color}, 0.3)`,
  };

  return (
    <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9" style={cellStyle}></div>
  );
};

export default React.memo(Cell);