
import React from 'react';
import { Stage } from '../types';
import Cell from './Cell';

interface BoardProps {
  stage: Stage;
}

const Board: React.FC<BoardProps> = ({ stage }) => {
  return (
    <div className="grid grid-cols-12 grid-rows-20 gap-px bg-gray-800 border-4 border-gray-700 rounded-lg shadow-lg">
      {stage.map(row => 
        row.map((cell, x) => <Cell key={x} type={cell[0]} />)
      )}
    </div>
  );
};

export default Board;
