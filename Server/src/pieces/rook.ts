import { Board } from "src/board/board.entity";
import { BoardSquare } from "src/board/board.interface";
import { Piece, PieceTypes } from "./piece.entity";

export class Rook extends Piece {
    constructor(id: string, boardSquareId: string, board: Board) {
        super(id, boardSquareId, board, PieceTypes.ROOK);
    }

    public getPossibleMoves(): BoardSquare[] {
        let possibleMoves: BoardSquare[] = [];

        if (!this.boardSquareId) {
            return [];
        }
        const [row, col] = this.boardSquareId.split('-').map(Number);

        const directions = [
            { dr: -1, dc: 0 }, // up
            { dr: 1, dc: 0 },  // down
            { dr: 0, dc: -1 }, // left
            { dr: 0, dc: 1 }   // right
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