import { Board } from "src/board/board.entity";
import { BoardSquare } from "src/board/board.interface";
import { Piece, PieceTypes } from "./piece.entity";

export class Bishop extends Piece {
    constructor(id: string, boardSquareId: string, board: Board) {
        super(id, boardSquareId, board, PieceTypes.BISHOP);
    }

    public getPossibleMoves(): BoardSquare[] {
        let possibleMoves: BoardSquare[] = [];

        if (!this.boardSquareId) {
            return [];
        }
        const [row, col] = this.boardSquareId.split('-').map(Number);

        // Directions: diagonals
        const directions = [
            { dr: -1, dc: -1 }, // up-left
            { dr: -1, dc: 1 },  // up-right
            { dr: 1, dc: -1 },  // down-left
            { dr: 1, dc: 1 }    // down-right
        ];

        for (const { dr, dc } of directions) {
            let r = row + dr;
            let c = col + dc;
            while (r >= 0 && r < 8 && c >= 0 && c < 8) {
                const square = this.board.getSquareById(`${r}-${c}`);
                if (!square) break;
                if (square.piece) {
                    if (square.piece.isWhite !== this.isWhite) {
                        possibleMoves.push(square); // capture
                    }
                    break; // blocked by any piece
                }
                possibleMoves.push(square);
                r += dr;
                c += dc;
            }
        }

        return possibleMoves;
    }
}