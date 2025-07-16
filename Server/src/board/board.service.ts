import { Injectable } from '@nestjs/common';
import { BoardState } from './board.interface';
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
}