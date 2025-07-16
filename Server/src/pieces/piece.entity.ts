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
    boardSquareId?: string;
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
                thisPawnPossibleMoves.push(DiagonalLeftSquare);
            }

            const DiagonalRightSquare = this.board.getSquareById(`${row + direction}-${col + 1}`);
            if (DiagonalRightSquare && DiagonalRightSquare.piece !== undefined && DiagonalRightSquare.piece.isWhite !== this.isWhite) {
                thisPawnPossibleMoves.push(DiagonalRightSquare);
            }
            
        }
        return thisPawnPossibleMoves;
    }
}