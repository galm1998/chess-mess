import { Injectable } from '@nestjs/common';
import { BoardState, BoardSquare } from './board.interface';
import { Board } from './board.entity';

@Injectable()
export class BoardService {
  private board: Board;

  constructor() {
    this.board = new Board();
  }

  getBoardState(): BoardState {
    return this.board.boardState;
  }

  getPossibleMoves(squareId: string): BoardSquare[] {
    return this.board.getPiecePossibleMoves(squareId);
  }

  makeMove(fromSquareId: string, toSquareId: string): boolean {
    return this.board.makeMove(fromSquareId, toSquareId);
  }
}