import React, { useState, useCallback, KeyboardEvent } from 'react';
import { usePlayer } from './hooks/usePlayer';
import { useStage } from './hooks/useStage';
import { useGameStatus } from './hooks/useGameStatus';
import { useInterval } from './hooks/useInterval';
import { createStage, checkCollision } from './gameHelpers';
import Board from './components/Board';
import GameInfo from './components/GameInfo';
import NextPiece from './components/NextPiece';

const App: React.FC = () => {
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(true);

  const { player, nextPlayer, updatePlayerPos, resetPlayer, playerRotate } = usePlayer();
  const { stage, setStage, rowsCleared } = useStage(player, resetPlayer);
  const { score, setScore, rows, setRows, level, setLevel } = useGameStatus(rowsCleared);

  const movePlayer = (dir: -1 | 1) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  };

  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(1);
  };

  const drop = () => {
    if (rows > level * 10) {
      setLevel(prev => prev + 1);
      setDropTime(1000 / level + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };
  
  const keyUp = ({ keyCode }: {keyCode: number}) => {
    if (!gameOver) {
      if (keyCode === 40) { // Down arrow
        setDropTime(1000 / level + 200);
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const hardDrop = () => {
    let tempPlayer = JSON.parse(JSON.stringify(player));
    while (!checkCollision(tempPlayer, stage, { x: 0, y: 1 })) {
      tempPlayer.pos.y += 1;
    }
    updatePlayerPos({ x: tempPlayer.pos.x - player.pos.x, y: tempPlayer.pos.y - player.pos.y, collided: true });
  };


  const move = (e: KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!gameOver) {
      if (e.keyCode === 37) { // Left arrow
        movePlayer(-1);
      } else if (e.keyCode === 39) { // Right arrow
        movePlayer(1);
      } else if (e.keyCode === 40) { // Down arrow
        dropPlayer();
      } else if (e.keyCode === 38) { // Up arrow
        playerRotate(stage);
      } else if (e.keyCode === 32) { // Space
        hardDrop();
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);


  return (
    <div 
      className="w-screen h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center font-mono" 
      role="button" 
      tabIndex={0} 
      onKeyDown={move} 
      onKeyUp={keyUp}
    >
      <div className="flex items-start justify-center p-4 md:p-8">
        <Board stage={stage} />
        <aside className="ml-8 w-48 md:w-64 lg:w-72">
          {gameOver ? (
            <div className="text-center p-4 bg-black bg-opacity-50 rounded-lg">
              <h2 className="text-2xl font-bold text-red-500 mb-4">Game Over</h2>
              <button
                onClick={startGame}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
              >
                Play Again
              </button>
            </div>
          ) : (
            <div>
              <NextPiece piece={nextPlayer.tetromino} />
              <GameInfo text="Score" value={score} />
              <GameInfo text="Rows" value={rows} />
              <GameInfo text="Level" value={level} />
              <button
                onClick={startGame}
                className="mt-8 w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors"
              >
                Restart Game
              </button>
            </div>
          )}
        </aside>
      </div>
      <div className="mt-4 text-gray-400 text-center text-sm p-4 hidden md:block">
        <p><span className="font-bold">Controls:</span></p>
        <p><span className="font-bold text-indigo-400">← →</span>: Move</p>
        <p><span className="font-bold text-indigo-400">↑</span>: Rotate</p>
        <p><span className="font-bold text-indigo-400">↓</span>: Soft Drop</p>
        <p><span className="font-bold text-indigo-400">Space</span>: Hard Drop</p>
      </div>
    </div>
  );
};

export default App;