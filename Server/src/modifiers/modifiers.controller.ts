import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ModifiersService } from './modifiers.service';
import { ModifiersState, Modifier } from './modifier.interface';


@Controller('modifiers')
export class ModifiersController {
  constructor(private readonly modifiersService: ModifiersService) { }

  @Get()
  GetModifiersState(): ModifiersState {
    return this.modifiersService.getModifiersState();
  }

  @Post('add')
  addModifier(@Param('modifierId') modifierId: string, @Query('isWhitePlayer') isWhitePlayer: string): void {
    this.modifiersService.addModifier(modifierId, isWhitePlayer === 'true');
  }

  @Post('remove/:modifierId')
  removeModifier(@Param('modifierId') modifierId: string, @Query('isWhitePlayer') isWhitePlayer: string): void {
    this.modifiersService.removeModifier(modifierId, isWhitePlayer === 'true');
  }

  @Post('activate/:modifierId')
  activateModifier(@Param('modifierId') modifierId: string, @Query('isWhitePlayer') isWhitePlayer: string): void {
    this.modifiersService.activateModifier(modifierId, isWhitePlayer === 'true');
  }

  @Post('deactivate/:modifierId')
  deactivateModifier(@Param('modifierId') modifierId: string, @Query('isWhitePlayer') isWhitePlayer: string): void {
    this.modifiersService.deactivateModifier(modifierId, isWhitePlayer === 'true');
  }
}
