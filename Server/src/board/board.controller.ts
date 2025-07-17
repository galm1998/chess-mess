import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardState, BoardSquare } from './board.interface';

@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) { }

    @Get('state')
    getBoardState(): BoardState {
        return this.boardService.getBoardState();
    }

    @Get('moves/:squareId')
    getPossibleMoves(@Param('squareId') squareId: string): BoardSquare[] {
        return this.boardService.getPossibleMoves(squareId);
    }

    @Post('move')
    makeMove(@Body('fromSquareId') fromSquareId: string, @Body('toSquareId') toSquareId: string): { success: boolean } {
        const success = this.boardService.makeMove(fromSquareId, toSquareId);
        return { success }
    }
}