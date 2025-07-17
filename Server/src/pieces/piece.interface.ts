import { BoardSquare } from "src/board/board.interface";

export interface ChessPiece {
  id: string;
  type: string;
  isWhite: boolean;
  boardSquareId: string;
  
  getPossibleMoves(): BoardSquare[];
}