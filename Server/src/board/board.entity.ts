import { Piece } from "src/pieces/piece.entity";
import { Pawn } from "src/pieces/pawn";
import { Rook } from "src/pieces/rook";
import { Knight } from "src/pieces/knight";
import { Bishop } from "src/pieces/bishop";
import { Queen } from "src/pieces/queen";
import { King } from "src/pieces/king";

import { ChessPiece } from "../pieces/piece.interface";
import { BoardSquare, BoardState } from "./board.interface";

export class Board {
    squares: BoardSquare[];
    blackPiecesOnBoard: ChessPiece[];
    whitePiecesOnBoard: ChessPiece[];

    currentTurn: 'white' | 'black';
    gameStatus: 'ongoing' | 'check' | 'checkmate' | 'draw';

    constructor() {
        this.currentTurn = 'white';
        this.gameStatus = 'ongoing';
        this.squares = [];
        this.blackPiecesOnBoard = [];
        this.whitePiecesOnBoard = [];

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                this.squares.push({
                    id: `${row}-${col}`,
                    row: row,
                    col: col
                } as BoardSquare);
            }
        }

        // #region init black pieces
        // rooks:
        let bRook1 = new Rook('b-rook-1', '0-0', this);
        this.blackPiecesOnBoard.push(bRook1);
        this.getSquareById('0-0').piece = bRook1;

        let bRook2 = new Rook('b-rook-2', '0-7', this);
        this.blackPiecesOnBoard.push(bRook2);
        this.getSquareById('0-7').piece = bRook2;

        // knights:
        let bKnight1 = new Knight('b-knight-1', '0-1', this);
        this.blackPiecesOnBoard.push(bKnight1);
        this.getSquareById('0-1').piece = bKnight1;

        let bKnight2 = new Knight('b-knight-2', '0-6', this);
        this.blackPiecesOnBoard.push(bKnight2);
        this.getSquareById('0-6').piece = bKnight2;

        // bishops:
        let bBishop1 = new Bishop('b-bishop-1', '0-2', this);
        this.blackPiecesOnBoard.push(bBishop1);
        this.getSquareById('0-2').piece = bBishop1;

        let bBishop2 = new Bishop('b-bishop-2', '0-5', this);
        this.blackPiecesOnBoard.push(bBishop2);
        this.getSquareById('0-5').piece = bBishop2;

        // queen:
        let bQueen = new Queen('b-queen', '0-3', this);
        this.blackPiecesOnBoard.push(bQueen);
        this.getSquareById('0-3').piece = bQueen;

        // king:
        let bKing = new King('b-king', '0-4', this);
        this.blackPiecesOnBoard.push(bKing);
        this.getSquareById('0-4').piece = bKing;

        // pawns:
        for (let col = 0; col < 8; col++) {
            let bPawn = new Pawn(`b-pawn-${col}`, `1-${col}`, this);
            this.blackPiecesOnBoard.push(bPawn);
            this.getSquareById(`1-${col}`).piece = bPawn;
        }
        //#endregion

        // #region init white pieces
        // rooks:
        let wRook1 = new Rook('w-rook-1', '7-0', this);
        this.whitePiecesOnBoard.push(wRook1);
        this.getSquareById('7-0').piece = wRook1;

        let wRook2 = new Rook('w-rook-2', '7-7', this);
        this.whitePiecesOnBoard.push(wRook2);
        this.getSquareById('7-7').piece = wRook2;

        // knights:
        let wKnight1 = new Knight('w-knight-1', '7-1', this);
        this.whitePiecesOnBoard.push(wKnight1);
        this.getSquareById('7-1').piece = wKnight1;

        let wKnight2 = new Knight('w-knight-2', '7-6', this);
        this.whitePiecesOnBoard.push(wKnight2);
        this.getSquareById('7-6').piece = wKnight2;

        // bishops:
        let wBishop1 = new Bishop('w-bishop-1', '7-2', this);
        this.whitePiecesOnBoard.push(wBishop1);
        this.getSquareById('7-2').piece = wBishop1;

        let wBishop2 = new Bishop('w-bishop-2', '7-5', this);
        this.whitePiecesOnBoard.push(wBishop2);
        this.getSquareById('7-5').piece = wBishop2;

        // queen:
        let wQueen = new Queen('w-queen', '7-3', this);
        this.whitePiecesOnBoard.push(wQueen);
        this.getSquareById('7-3').piece = wQueen;

        // king:
        let wKing = new King('w-king', '7-4', this);
        this.whitePiecesOnBoard.push(wKing);
        this.getSquareById('7-4').piece = wKing;

        // pawns:
        for (let col = 0; col < 8; col++) {
            let wPawn = new Pawn(`w-pawn-${col}`, `6-${col}`, this);
            this.whitePiecesOnBoard.push(wPawn);
            this.getSquareById(`6-${col}`).piece = wPawn;
        }
        //#endregion
    }

    public getPiecePossibleMoves(squareId: string): BoardSquare[] {
        const piece = this.getSquareById(squareId).piece as Piece;
        if (piece) {
            return piece.getPossibleMoves();
        }
        return [];
    }

    public getSquareById(id: string): BoardSquare {
        return this.squares.find(square => square.id === id) as BoardSquare;
    }

    public get boardState(): BoardState {
        return {
            squares: this.squares,
            whitePieces: this.whitePiecesOnBoard,
            blackPieces: this.blackPiecesOnBoard,
            currentTurn: this.currentTurn,
            gameStatus: this.gameStatus
        };
    }

    private isKingInCheck(isWhite: boolean): boolean {
        const king = (isWhite ? this.whitePiecesOnBoard : this.blackPiecesOnBoard).find(p => p.type === 'king');
        if (!king) return false;
        const opponentPieces = isWhite ? this.blackPiecesOnBoard : this.whitePiecesOnBoard;
        return opponentPieces.some(piece => {
            const moves = (piece as Piece).getPossibleMoves().map(sq => sq.id);
            return moves.includes(king.boardSquareId);
        });
    }

    private isKingInCheckmate(isWhite: boolean): boolean {
        if (!this.isKingInCheck(isWhite)) return false;
        const pieces = isWhite ? this.whitePiecesOnBoard : this.blackPiecesOnBoard;
        // If no legal move can get king out of check, it's checkmate
        for (const piece of pieces) {
            const possibleMoves = (piece as Piece).getPossibleMoves();
            for (const move of possibleMoves) {
                // Simulate move
                const originalSquare = this.getSquareById(piece.boardSquareId);
                const targetSquare = this.getSquareById(move.id);
                const captured = targetSquare.piece;
                originalSquare.piece = undefined;
                targetSquare.piece = piece;
                piece.boardSquareId = move.id;

                const stillInCheck = this.isKingInCheck(isWhite);

                // Undo move
                targetSquare.piece = captured;
                originalSquare.piece = piece;
                piece.boardSquareId = originalSquare.id;

                if (!stillInCheck) return false;
            }
        }
        return true;
    }

    public makeMove(fromSquareId: string, toSquareId: string): boolean {
        const fromSquare = this.getSquareById(fromSquareId);
        const toSquare = this.getSquareById(toSquareId);

        if (!fromSquare || !fromSquare.piece) {
            return false; // No piece to move
        }

        const piece = fromSquare.piece as Piece;
        const possibleMoves = piece.getPossibleMoves().map(sq => sq.id);

        if (!possibleMoves.includes(toSquareId)) {
            return false; // Move not allowed
        }

        // Handle capture
        if (toSquare.piece) {
            const capturedPiece = toSquare.piece;
            if (capturedPiece.isWhite) {
                this.whitePiecesOnBoard = this.whitePiecesOnBoard.filter(p => p !== capturedPiece);
            } else {
                this.blackPiecesOnBoard = this.blackPiecesOnBoard.filter(p => p !== capturedPiece);
            }
        }

        // Move the piece
        toSquare.piece = piece;
        fromSquare.piece = undefined;
        piece.boardSquareId = toSquareId;

        // Switch turn
        this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white';

        // Check win/draw/check status
        const isWhiteTurn = this.currentTurn === 'white';
        if (this.isKingInCheckmate(isWhiteTurn)) {
            this.gameStatus = 'checkmate';
        } else if (this.isKingInCheck(isWhiteTurn)) {
            this.gameStatus = 'check';
        } else {
            this.gameStatus = 'ongoing';
        }

        return true;
    }
}

