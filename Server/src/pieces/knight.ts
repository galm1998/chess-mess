import { Board } from "src/board/board.entity";
import { BoardSquare } from "src/board/board.interface";
import { Piece, PieceTypes } from "./piece.entity";

export class Knight extends Piece {
    constructor(id: string, boardSquareId: string, board: Board) {
        super(id, boardSquareId, board, PieceTypes.KNIGHT);
    }

    public getPossibleMoves(): BoardSquare[] {
        let possibleMoves: BoardSquare[] = [];

        if (!this.boardSquareId) {
            return [];
        }
        const [row, col] = this.boardSquareId.split('-').map(Number);

        // All possible knight moves (L-shape)
        const moves = [
            [row - 2, col - 1],
            [row - 2, col + 1],
            [row - 1, col - 2],
            [row - 1, col + 2],
            [row + 1, col - 2],
            [row + 1, col + 2],
            [row + 2, col - 1],
            [row + 2, col + 1]
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