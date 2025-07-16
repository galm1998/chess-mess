import { Pawn, Piece, PieceTypes } from "src/pieces/piece.entity";
import { ChessPiece } from "../pieces/piece.interface";
import { BoardSquare, BoardState } from "./board.interface";

export class Board {
    squares: BoardSquare[];
    blackPieces: ChessPiece[];
    whitePieces: ChessPiece[];

    currentTurn: 'white' | 'black';
    gameStatus: 'ongoing' | 'check' | 'checkmate' | 'draw';

    constructor() {
        this.currentTurn = 'white';
        this.gameStatus = 'ongoing';
        this.squares = [];
        this.blackPieces = [];
        this.whitePieces = [];

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                this.squares.push({
                    id: `${row}-${col}`,
                    row: row,
                    col: col,
                    isOccupied: false
                } as BoardSquare);
            }
        }

        // #region init black pieces
        // rooks:
        let bRook1: ChessPiece = {
            id: 'b-rook-1',
            type: PieceTypes.ROOK,
            boardSquareId: '0-0',
            isWhite: false
        };
        this.blackPieces.push(bRook1);
        this.getSquareById('0-0').piece = bRook1;

        let bRook2: ChessPiece = {
            id: 'b-rook-2',
            type: PieceTypes.ROOK,
            boardSquareId: '0-7',
            isWhite: false
        };
        this.blackPieces.push(bRook2);
        this.getSquareById('0-7').piece = bRook2;

        // knights:
        let bKnight1: ChessPiece = {
            id: 'b-knight-1',
            type: PieceTypes.KNIGHT,
            boardSquareId: '0-1',
            isWhite: false
        };
        this.blackPieces.push(bKnight1);
        this.getSquareById('0-1').piece = bKnight1;

        let bKnight2: ChessPiece = {
            id: 'b-knight-2',
            type: PieceTypes.KNIGHT,
            boardSquareId: '0-6',
            isWhite: false
        };
        this.blackPieces.push(bKnight2);
        this.getSquareById('0-6').piece = bKnight2;

        // bishops:
        let bBishop1: ChessPiece = {
            id: 'b-bishop-1',
            type: PieceTypes.BISHOP,
            boardSquareId: '0-2',
            isWhite: false
        };
        this.blackPieces.push(bBishop1);
        this.getSquareById('0-2').piece = bBishop1;

        let bBishop2: ChessPiece = {
            id: 'b-bishop-2',
            type: PieceTypes.BISHOP,
            boardSquareId: '0-5',
            isWhite: false
        };
        this.blackPieces.push(bBishop2);
        this.getSquareById('0-5').piece = bBishop2;

        // queen:
        let bQueen: ChessPiece = {
            id: 'b-queen',
            type: PieceTypes.QUEEN,
            boardSquareId: '0-3',
            isWhite: false
        };
        this.blackPieces.push(bQueen);
        this.getSquareById('0-3').piece = bQueen;

        // king:
        let bKing: ChessPiece = {
            id: 'b-king',
            type: PieceTypes.KING,
            boardSquareId: '0-4',
            isWhite: false
        };
        this.blackPieces.push(bKing);
        this.getSquareById('0-4').piece = bKing;

        // pawns:
        for (let col = 0; col < 8; col++) {
            let bPawn: ChessPiece = {
                id: `b-pawn-${col}`,
                type: PieceTypes.PAWN,
                boardSquareId: `1-${col}`,
                isWhite: false
            };
            // bPawn = new Pawn(bPawn.id, bPawn.boardSquareId);
            this.blackPieces.push(bPawn);
            this.getSquareById(`1-${col}`).piece = bPawn;
        }
        //#endregion

        // #region init white pieces
        // rooks:
        let wRook1: ChessPiece = {
            id: 'w-rook-1',
            type: PieceTypes.ROOK,
            boardSquareId: '7-0',
            isWhite: true
        };
        this.whitePieces.push(wRook1);
        this.getSquareById('7-0').piece = wRook1;

        let wRook2: ChessPiece = {
            id: 'w-rook-2',
            type: PieceTypes.ROOK,
            boardSquareId: '7-7',
            isWhite: true
        };
        this.whitePieces.push(wRook2);
        this.getSquareById('7-7').piece = wRook2;

        // knights:
        let wKnight1: ChessPiece = {
            id: 'w-knight-1',
            type: PieceTypes.KNIGHT,
            boardSquareId: '7-1',
            isWhite: true
        };
        this.whitePieces.push(wKnight1);
        this.getSquareById('7-1').piece = wKnight1;

        let wKnight2: ChessPiece = {
            id: 'w-knight-2',
            type: PieceTypes.KNIGHT,
            boardSquareId: '7-6',
            isWhite: true
        };
        this.whitePieces.push(wKnight2);
        this.getSquareById('7-6').piece = wKnight2;

        // bishops:
        let wBishop1: ChessPiece = {
            id: 'w-bishop-1',
            type: PieceTypes.BISHOP,
            boardSquareId: '7-2',
            isWhite: true
        };
        this.whitePieces.push(wBishop1);
        this.getSquareById('7-2').piece = wBishop1;

        let wBishop2: ChessPiece = {
            id: 'w-bishop-2',
            type: PieceTypes.BISHOP,
            boardSquareId: '7-5',
            isWhite: true
        };
        this.whitePieces.push(wBishop2);
        this.getSquareById('7-5').piece = wBishop2;

        // queen:
        let wQueen: ChessPiece = {
            id: 'w-queen',
            type: PieceTypes.QUEEN,
            boardSquareId: '7-3',
            isWhite: true
        };
        this.whitePieces.push(wQueen);
        this.getSquareById('7-3').piece = wQueen;

        // king:
        let wKing: ChessPiece = {
            id: 'w-king',
            type: PieceTypes.KING,
            boardSquareId: '7-4',
            isWhite: true
        };
        this.whitePieces.push(wKing);
        this.getSquareById('7-4').piece = wKing;

        // pawns:
        for (let col = 0; col < 8; col++) {
            let wPawn: ChessPiece = {
                id: `w-pawn-${col}`,
                type: PieceTypes.PAWN,
                boardSquareId: `6-${col}`,
                isWhite: true
            };
            this.whitePieces.push(wPawn);
            this.getSquareById(`6-${col}`).piece = wPawn;
        }
        //#endregion
    }

    // might be annoying to send correct piece instance every time.
    public getPiecePossibleMoves(squareId: string): BoardSquare[] {

        const piece = this.getSquareById(squareId).piece as ChessPiece;
        if (piece) {
            if (piece instanceof Pawn) {
                return piece.getPossibleMoves();
            }
            // Add other piece types here as needed
        }
        return [];
    }

    public getSquareById(id: string): BoardSquare {
        return this.squares.find(square => square.id === id) as BoardSquare;
    }

    public get boardState(): BoardState {
        return {
            squares: this.squares,
            whitePieces: this.whitePieces,
            blackPieces: this.blackPieces,
            currentTurn: this.currentTurn,
            gameStatus: this.gameStatus
        };
    }
}

