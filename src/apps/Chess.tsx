import { useState, useCallback } from 'react';
import * as Icons from 'lucide-react';

type Piece = { type: string; color: 'w' | 'b' } | null;

const INITIAL_BOARD: Piece[][] = [
  [{ type: 'r', color: 'b' }, { type: 'n', color: 'b' }, { type: 'b', color: 'b' }, { type: 'q', color: 'b' }, { type: 'k', color: 'b' }, { type: 'b', color: 'b' }, { type: 'n', color: 'b' }, { type: 'r', color: 'b' }],
  [{ type: 'p', color: 'b' }, { type: 'p', color: 'b' }, { type: 'p', color: 'b' }, { type: 'p', color: 'b' }, { type: 'p', color: 'b' }, { type: 'p', color: 'b' }, { type: 'p', color: 'b' }, { type: 'p', color: 'b' }],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [{ type: 'p', color: 'w' }, { type: 'p', color: 'w' }, { type: 'p', color: 'w' }, { type: 'p', color: 'w' }, { type: 'p', color: 'w' }, { type: 'p', color: 'w' }, { type: 'p', color: 'w' }, { type: 'p', color: 'w' }],
  [{ type: 'r', color: 'w' }, { type: 'n', color: 'w' }, { type: 'b', color: 'w' }, { type: 'q', color: 'w' }, { type: 'k', color: 'w' }, { type: 'b', color: 'w' }, { type: 'n', color: 'w' }, { type: 'r', color: 'w' }],
];

const PIECE_SYMBOLS: Record<string, string> = { k: '♔', q: '♕', r: '♖', b: '♗', n: '♘', p: '♙', K: '♚', Q: '♛', R: '♜', B: '♝', N: '♞', P: '♟' };

export default function Chess() {
  const [board, setBoard] = useState<Piece[][]>(INITIAL_BOARD);
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [turn, setTurn] = useState<'w' | 'b'>('w');
  const [captured, setCaptured] = useState<{ w: string[]; b: string[] }>({ w: [], b: [] });

  const handleClick = useCallback((row: number, col: number) => {
    if (selected) {
      const [sr, sc] = selected;
      const piece = board[sr][sc];
      if (piece && piece.color === turn) {
        const target = board[row][col];
        if (target) {
          setCaptured(prev => ({ ...prev, [turn]: [...prev[turn], target.type] }));
        }
        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = piece;
        newBoard[sr][sc] = null;
        setBoard(newBoard);
        setTurn(turn === 'w' ? 'b' : 'w');
      }
      setSelected(null);
    } else {
      const piece = board[row][col];
      if (piece && piece.color === turn) {
        setSelected([row, col]);
      }
    }
  }, [selected, board, turn]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-200 p-4">
      <div className="mb-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Icons.Crown size={16} className={turn === 'w' ? 'text-yellow-400' : 'text-zinc-600'} />
          <span className="text-sm">{turn === 'w' ? "White's turn" : "Black's turn"}</span>
        </div>
      </div>
      <div className="grid grid-cols-8 border-2 border-zinc-600 rounded-lg overflow-hidden" style={{ width: '400px', height: '400px' }}>
        {board.map((row, ri) => row.map((cell, ci) => {
          const isSelected = selected?.[0] === ri && selected?.[1] === ci;
          const isLight = (ri + ci) % 2 === 0;
          return (
            <button key={`${ri}-${ci}`} onClick={() => handleClick(ri, ci)}
              className={`flex items-center justify-center text-2xl ${isLight ? 'bg-amber-100' : 'bg-amber-800'} ${isSelected ? 'ring-2 ring-blue-400 ring-inset' : ''}`}
              style={{ width: '50px', height: '50px' }}>
              {cell && <span className={cell.color === 'w' ? 'text-white drop-shadow' : 'text-black'}>{PIECE_SYMBOLS[cell.color === 'w' ? cell.type.toUpperCase() : cell.type]}</span>}
            </button>
          );
        }))}
      </div>
      <div className="mt-4 flex gap-4 text-xs text-zinc-500">
        <div>White captured: {captured.w.join(', ') || 'None'}</div>
        <div>Black captured: {captured.b.join(', ') || 'None'}</div>
      </div>
    </div>
  );
}
