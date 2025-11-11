
import React from 'react';
import { TetrominoShape } from '../types';
import Cell from './Cell';

interface NextPieceProps {
    piece: TetrominoShape;
}

const NextPiece: React.FC<NextPieceProps> = ({ piece }) => {
    const gridStyle: React.CSSProperties = {
        gridTemplateRows: `repeat(${piece.length}, 1fr)`,
        gridTemplateColumns: `repeat(${piece[0].length}, 1fr)`,
    };
    
    return (
        <div className="p-4 bg-black bg-opacity-50 rounded-lg mb-4">
            <h2 className="text-xl font-bold text-center mb-4 text-indigo-300">Next</h2>
            <div className="flex justify-center items-center">
                <div className="grid gap-px" style={gridStyle}>
                    {piece.map((row, y) => 
                        row.map((cell, x) => <Cell key={`${y}-${x}`} type={cell} />)
                    )}
                </div>
            </div>
        </div>
    );
};

export default NextPiece;
