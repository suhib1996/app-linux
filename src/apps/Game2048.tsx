import { useState, useEffect, useCallback } from 'react';
import * as Icons from 'lucide-react';

const GRID_SIZE = 4;

function createBoard(): number[][] {
  const board = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
  addRandom(addRandom(board));
  return board;
}

function addRandom(board: number[][]): number[][] {
  const empty: [number, number][] = [];
  board.forEach((row, r) => row.forEach((cell, c) => { if (cell === 0) empty.push([r, c]); }));
  if (empty.length === 0) return board;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  const newBoard = board.map(row => [...row]);
  newBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
  return newBoard;
}

function slideRow(row: number[]): [number[], number] {
  const filtered = row.filter(x => x !== 0);
  let score = 0;
  for (let i = 0; i < filtered.length - 1; i++) {
    if (filtered[i] === filtered[i + 1]) {
      filtered[i] *= 2;
      score += filtered[i];
      filtered.splice(i + 1, 1);
    }
  }
  while (filtered.length < GRID_SIZE) filtered.push(0);
  return [filtered, score];
}

function moveLeft(board: number[][]): [number[][], number] {
  let totalScore = 0;
  const newBoard = board.map(row => {
    const [newRow, score] = slideRow([...row]);
    totalScore += score;
    return newRow;
  });
  return [newBoard, totalScore];
}

function rotate(board: number[][]): number[][] {
  const N = board.length;
  return board.map((_, i) => board.map(row => row[N - 1 - i]));
}

const COLORS: Record<number, string> = {
  0: 'bg-zinc-700/30', 2: 'bg-zinc-600', 4: 'bg-zinc-500', 8: 'bg-amber-700',
  16: 'bg-amber-600', 32: 'bg-orange-600', 64: 'bg-orange-500',
  128: 'bg-yellow-600', 256: 'bg-yellow-500', 512: 'bg-green-600',
  1024: 'bg-green-500', 2048: 'bg-blue-500',
};

export default function Game2048() {
  const [board, setBoard] = useState(createBoard);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(2048);

  const move = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    setBoard(prev => {
      let working = prev.map(r => [...r]);
      let rotations = 0;
      if (direction === 'up') { working = rotate(working); rotations = 1; }
      else if (direction === 'right') { working = rotate(rotate(working)); rotations = 2; }
      else if (direction === 'down') { working = rotate(rotate(rotate(working))); rotations = 3; }

      const [newBoard, addScore] = moveLeft(working);
      setScore(s => s + addScore);

      let result = newBoard;
      for (let i = 0; i < (4 - rotations) % 4; i++) result = rotate(result);
      return addRandom(result);
    });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') move('left');
      else if (e.key === 'ArrowRight') move('right');
      else if (e.key === 'ArrowUp') move('up');
      else if (e.key === 'ArrowDown') move('down');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [move]);

  const reset = () => { setBoard(createBoard()); setScore(0); };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-200 p-4">
      <div className="flex items-center justify-between w-80 mb-4">
        <div>
          <h2 className="text-2xl font-bold">2048</h2>
          <div className="text-xs text-zinc-500">Use arrow keys</div>
        </div>
        <div className="flex gap-2">
          <div className="bg-zinc-800 rounded-lg px-3 py-1 text-center">
            <div className="text-xs text-zinc-500">Score</div>
            <div className="font-medium">{score}</div>
          </div>
          <div className="bg-zinc-800 rounded-lg px-3 py-1 text-center">
            <div className="text-xs text-zinc-500">Best</div>
            <div className="font-medium">{bestScore}</div>
          </div>
        </div>
      </div>
      <div className="bg-zinc-800 rounded-xl p-3 grid grid-cols-4 gap-2" style={{ width: '320px', height: '320px' }}>
        {board.flat().map((cell, i) => (
          <div key={i} className={`rounded-lg flex items-center justify-center text-lg font-bold transition-all ${COLORS[cell] || 'bg-blue-600'} ${cell > 4 ? 'text-white' : 'text-zinc-200'}`}>
            {cell || ''}
          </div>
        ))}
      </div>
      <button onClick={reset} className="mt-4 px-4 py-2 bg-zinc-800 rounded-lg text-sm hover:bg-zinc-700 flex items-center gap-2">
        <Icons.RefreshCw size={14} /> New Game
      </button>
    </div>
  );
}
