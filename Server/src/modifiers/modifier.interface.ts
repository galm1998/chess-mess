export interface Modifier {
  id: string;
  name: string; // Name of the modifier
  description?: string; // Optional description of the modifier
  effects: string; // active effects on the modifier
  active: boolean; // Indicates if the modifier is currently active
}

export interface ModifiersState {
  whitePlayerModifiers: Modifier[];
  blackPlayerModifiers: Modifier[];
}