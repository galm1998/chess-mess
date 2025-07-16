import { ChessPiece } from "../pieces/piece.interface";

export interface BoardState {
  squares: BoardSquare[];
  whitePieces: ChessPiece[];
  blackPieces: ChessPiece[];

  currentTurn: 'white' | 'black';
  gameStatus: 'ongoing' | 'check' | 'checkmate' | 'draw';
}

export interface BoardSquare {
  id: string;
  row: number;
  col: number;
  
  piece?: ChessPiece;
  modifier?: BoardModifier;
}

export interface BoardModifier {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}