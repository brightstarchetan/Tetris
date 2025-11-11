
import React from 'react';

interface GameInfoProps {
  text: string;
  value: number;
}

const GameInfo: React.FC<GameInfoProps> = ({ text, value }) => {
  return (
    <div className="flex justify-between items-center p-2 mt-2 bg-black bg-opacity-50 rounded-lg text-lg">
      <span className="font-bold text-indigo-300">{text}:</span>
      <span className="text-white">{value}</span>
    </div>
  );
};

export default GameInfo;
