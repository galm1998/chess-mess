import { Board } from "src/board/board.entity";
import { BoardSquare } from "src/board/board.interface";
import { ChessPiece } from "./piece.interface";

export const enum PieceTypes {
    PAWN = "PAWN",
    ROOK = "ROOK",
    KNIGHT = "KNIGHT",
    BISHOP = "BISHOP",
    QUEEN = "QUEEN",
    KING = "KING"
}

export abstract class Piece implements ChessPiece {
    id: string;
    type: PieceTypes;
    isWhite: boolean;
    boardSquareId: string;
    board: Board;

    constructor(id: string, boardSquareId: string, board: Board, type: PieceTypes) {
        this.id = id;
        this.boardSquareId = boardSquareId;
        this.isWhite = boardSquareId.startsWith('w-'); // Assuming white pieces have 'w-' prefix
        this.board = board;
        this.type = type;
    }


    abstract getPossibleMoves(): BoardSquare[];
}