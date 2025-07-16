import { Injectable } from '@nestjs/common';
import { ModifiersState, Modifier } from './modifier.interface';

@Injectable()
export class ModifiersService {
  private modifierState: ModifiersState;

  getModifiersState(): ModifiersState {
    return this.modifierState;
  }

  addModifier(modifierId: string, isWhitePlayer: boolean): void {
    let modifierSet = isWhitePlayer ? this.modifierState.whitePlayerModifiers : this.modifierState.blackPlayerModifiers;
    
    let modifier: Modifier = {
      id: modifierId,
      name: `Modifier ${modifierId}`,
      description: `Description for modifier ${modifierId}`,
      effects: `Effects on modifier ${modifierId}`, // examples: blocked slot, disable modifier for 3 turns, etc.
      active: false
    };

    modifierSet.push(modifier);
  }

  removeModifier(id: string, isWhitePlayer: boolean): void {
    let modifierSet = isWhitePlayer ? this.modifierState.whitePlayerModifiers : this.modifierState.blackPlayerModifiers;

    modifierSet.filter(modifier => modifier.id !== id);
  }

  activateModifier(id: string, isWhitePlayer: boolean): void {
    let modifierSet = isWhitePlayer ? this.modifierState.whitePlayerModifiers : this.modifierState.blackPlayerModifiers;

    let modifier = modifierSet.find(mod => mod.id === id);
  
    if (modifier) {
      modifier.active = true;
    }
  }

  deactivateModifier(id: string, isWhitePlayer: boolean): void {
    let modifierSet = isWhitePlayer ? this.modifierState.whitePlayerModifiers : this.modifierState.blackPlayerModifiers;

    let modifier = modifierSet.find(mod => mod.id === id);

    if (modifier) {
      modifier.active = false;
    }
  }
}