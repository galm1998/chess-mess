export interface ChessPiece {
  id: string;
  type: string;
  isWhite: boolean;
  boardSquareId?: string; 
}