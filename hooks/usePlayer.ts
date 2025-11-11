
import { useState, useCallback } from 'react';
import { randomTetromino, STAGE_WIDTH, checkCollision, TETROMINOS } from '../gameHelpers';
import { Player, Stage, TetrominoShape, NextPlayer } from '../types';

export const usePlayer = () => {
  const [player, setPlayer] = useState<Player>({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const [nextPlayer, setNextPlayer] = useState<NextPlayer>({
    tetromino: randomTetromino().shape,
  });

  const rotate = (matrix: TetrominoShape) => {
    const rotatedTetro = matrix.map((_, index) => matrix.map(col => col[index]));
    return rotatedTetro.map(row => row.reverse());
  };

  const playerRotate = (stage: Stage) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        clonedPlayer.pos.x = pos; // Reset if cannot rotate
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }: { x: number; y: number; collided: boolean; }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: prev.pos.x + x, y: prev.pos.y + y },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 1, y: 0 },
      tetromino: nextPlayer.tetromino,
      collided: false,
    });
    setNextPlayer({ tetromino: randomTetromino().shape });
  }, [nextPlayer]);

  return { player, nextPlayer, updatePlayerPos, resetPlayer, playerRotate };
};
