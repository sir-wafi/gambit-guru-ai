import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

export type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
export type PieceColor = 'white' | 'black';

export interface ChessPiece {
  type: PieceType;
  color: PieceColor;
}

export interface Position {
  row: number;
  col: number;
}

interface ChessBoardProps {
  onMove?: (from: Position, to: Position) => void;
  highlightedSquares?: Position[];
  className?: string;
}

const PIECE_SYMBOLS: Record<PieceColor, Record<PieceType, string>> = {
  white: {
    king: '♔',
    queen: '♕',
    rook: '♖',
    bishop: '♗',
    knight: '♘',
    pawn: '♙'
  },
  black: {
    king: '♚',
    queen: '♛',
    rook: '♜',
    bishop: '♝',
    knight: '♞',
    pawn: '♟'
  }
};

const INITIAL_BOARD: (ChessPiece | null)[][] = [
  [
    { type: 'rook', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'queen', color: 'black' },
    { type: 'king', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'rook', color: 'black' }
  ],
  Array(8).fill({ type: 'pawn', color: 'black' }),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill({ type: 'pawn', color: 'white' }),
  [
    { type: 'rook', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'queen', color: 'white' },
    { type: 'king', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'rook', color: 'white' }
  ]
];

export const ChessBoard: React.FC<ChessBoardProps> = ({
  onMove,
  highlightedSquares = [],
  className
}) => {
  const [board, setBoard] = useState<(ChessPiece | null)[][]>(INITIAL_BOARD);
  const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Position[]>([]);

  const isSquareHighlighted = useCallback((row: number, col: number) => {
    return highlightedSquares.some(pos => pos.row === row && pos.col === col);
  }, [highlightedSquares]);

  const isSquareSelected = useCallback((row: number, col: number) => {
    return selectedSquare?.row === row && selectedSquare?.col === col;
  }, [selectedSquare]);

  const isPossibleMove = useCallback((row: number, col: number) => {
    return possibleMoves.some(pos => pos.row === row && pos.col === col);
  }, [possibleMoves]);

  const handleSquareClick = useCallback((row: number, col: number) => {
    if (selectedSquare && isPossibleMove(row, col)) {
      // Make move
      const newBoard = board.map(r => [...r]);
      const piece = newBoard[selectedSquare.row][selectedSquare.col];
      newBoard[selectedSquare.row][selectedSquare.col] = null;
      newBoard[row][col] = piece;
      
      setBoard(newBoard);
      onMove?.(selectedSquare, { row, col });
      setSelectedSquare(null);
      setPossibleMoves([]);
    } else if (board[row][col]) {
      // Select piece
      setSelectedSquare({ row, col });
      // In a real implementation, calculate legal moves here
      setPossibleMoves([]);
    } else {
      setSelectedSquare(null);
      setPossibleMoves([]);
    }
  }, [selectedSquare, board, possibleMoves, onMove, isPossibleMove]);

  return (
    <div className={cn("grid grid-cols-8 gap-0 w-80 h-80 border-4 border-primary rounded-lg overflow-hidden", className)}
         style={{ boxShadow: 'var(--shadow-board)' }}>
      {Array.from({ length: 8 }, (_, row) =>
        Array.from({ length: 8 }, (_, col) => {
          const isLight = (row + col) % 2 === 0;
          const piece = board[row][col];
          
          return (
            <div
              key={`${row}-${col}`}
              className={cn(
                "w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-200 hover:brightness-110",
                isLight ? "bg-chess-light" : "bg-chess-dark",
                isSquareSelected(row, col) && "ring-2 ring-accent ring-inset",
                isSquareHighlighted(row, col) && "bg-chess-highlight",
                isPossibleMove(row, col) && "bg-chess-move"
              )}
              onClick={() => handleSquareClick(row, col)}
            >
              {piece && (
                <span 
                  className="text-2xl select-none transition-transform hover:scale-110"
                  style={{ 
                    filter: 'var(--shadow-piece)',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                  }}
                >
                  {PIECE_SYMBOLS[piece.color][piece.type]}
                </span>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};