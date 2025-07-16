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

// GetModifiersState():
// Assuming white has logged off, and is now re-joining the game after black has played,
// We need a way to get the current modifiers states for both players:

// Each player has 5 modifier slots,

// We need to get each player’s 5 modifiers (empty / modifier-card-modifierId and if there are any effects on the modifier slot)

// Example for modifier slot effect could be that white player can block / disable the effect of one of the modifier slots for x turns.

// UseActiveModifier(<modifier-modifierId>):
