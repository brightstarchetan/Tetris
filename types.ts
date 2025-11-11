
export type TetrominoShape = (string | number)[][];

export interface Tetromino {
  shape: TetrominoShape;
  color: string;
}

export interface Tetrominos {
  0: { shape: (string | number)[][]; color: string; };
  I: Tetromino;
  J: Tetromino;
  L: Tetromino;
  O: Tetromino;
  S: Tetromino;
  T: Tetromino;
  Z: Tetromino;
}

export type StageCell = [string | number, string];

export type Stage = StageCell[][];

export interface Player {
  pos: {
    x: number;
    y: number;
  };
  tetromino: TetrominoShape;
  collided: boolean;
}

export interface NextPlayer {
    tetromino: TetrominoShape;
}
