import { Board } from "src/board/board.entity";
import { BoardSquare } from "src/board/board.interface";
import { Piece, PieceTypes } from "./piece.entity";

export class Pawn extends Piece {
    constructor(id: string, boardSquareId: string, board: Board) {
        super(id, boardSquareId, board, PieceTypes.PAWN);
    }

    public getPossibleMoves(): BoardSquare[] {
        let thisPawnPossibleMoves: BoardSquare[] = [];

        if (!this.boardSquareId) {
            return [];
        }
        const [row, col] = this.boardSquareId.split('-').map(Number);
        const direction = this.isWhite ? -1 : 1;
        
        // forward move
        const forwardSquareId = `${row + direction}-${col}`;
        const forwardSquare = this.board.getSquareById(forwardSquareId);
        if (forwardSquare && forwardSquare.piece === undefined) {
            thisPawnPossibleMoves.push(forwardSquare);
        }

        // double move
        if (this.isWhite && row === 6 || !this.isWhite && row === 1) {
            const doubleForwardSquareId = `${row + 2 * direction}-${col}`;
            const doubleForwardSquare = this.board.getSquareById(doubleForwardSquareId);
            if (doubleForwardSquare && doubleForwardSquare.piece === undefined) {
                thisPawnPossibleMoves.push(doubleForwardSquare);
            }
        }

        // check attack left and right diagonals
        if (col > 0) {
            const DiagonalLeftSquare = this.board.getSquareById(`${row + direction}-${col - 1}`); 

            if (DiagonalLeftSquare && DiagonalLeftSquare.piece !== undefined && DiagonalLeftSquare.piece.isWhite !== this.isWhite) {
                thisPawnPossibleMoves.push(DiagonalLeftSquare); // note that this is a capture move
            }
        }

        if (col < 7) {
            const DiagonalRightSquare = this.board.getSquareById(`${row + direction}-${col + 1}`); 

            if (DiagonalRightSquare && DiagonalRightSquare.piece !== undefined && DiagonalRightSquare.piece.isWhite !== this.isWhite) {
                thisPawnPossibleMoves.push(DiagonalRightSquare); // note that this is a capture move
            }
        }
        
        return thisPawnPossibleMoves;
    }
}