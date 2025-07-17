import { Board } from "src/board/board.entity";
import { BoardSquare } from "src/board/board.interface";
import { Piece, PieceTypes } from "./piece.entity";

export class King extends Piece {
    constructor(id: string, boardSquareId: string, board: Board) {
        super(id, boardSquareId, board, PieceTypes.KING);
    }

    public getPossibleMoves(): BoardSquare[] {
        let possibleMoves: BoardSquare[] = [];

        if (!this.boardSquareId) {
            return [];
        }
        const [row, col] = this.boardSquareId.split('-').map(Number);

        // All adjacent squares (8 directions)
        const moves = [
            [row - 1, col - 1],
            [row - 1, col],
            [row - 1, col + 1],
            [row, col - 1],
            [row, col + 1],
            [row + 1, col - 1],
            [row + 1, col],
            [row + 1, col + 1]
        ];

        for (const [r, c] of moves) {
            if (r >= 0 && r < 8 && c >= 0 && c < 8) {
                const square = this.board.getSquareById(`${r}-${c}`);
                if (square) {
                    if (!square.piece || square.piece.isWhite !== this.isWhite) {
                        possibleMoves.push(square);
                    }
                }
            }
        }

        return possibleMoves;
    }
}