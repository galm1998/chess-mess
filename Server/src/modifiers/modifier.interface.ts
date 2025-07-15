export interface Modifier {
  id: string;
  name: string;
  effect: string; // Description of the modifier's effect
  active: boolean; // Indicates if the modifier is currently active
}

export interface ModifiersState {
  whitePlayerModifiers: Modifier[];
  blackPlayerModifiers: Modifier[];
}