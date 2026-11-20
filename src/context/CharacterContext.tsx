import React, { createContext, useContext, useMemo, useReducer } from 'react';

export type CharacterClass = 'warrior' | 'mage' | 'rogue';
export type ItemId = 'potion';

export const class_hp: Record<CharacterClass, number> = {
  warrior: 30,
  rogue: 24,
  mage: 20,
};

export type Effects = {
  hp?: number;
  addItem?: ItemId;
};

export type CharacterState = {
  name: string;
  characterClass: CharacterClass;
  hp: number;
  maxHp: number;
  inventory: ItemId[];
  location: string;
};

type Action =
  | { type: 'START'; name: string; characterClass: CharacterClass }
  | { type: 'MOVE'; target: string; effects?: Effects }
  | { type: 'RESTART' };

const initialState: CharacterState = {
  name: '',
  characterClass: 'warrior',
  hp: class_hp.warrior,
  maxHp: class_hp.warrior,
  inventory: [],
  location: 'start',
};

function reducer(state: CharacterState, action: Action): CharacterState {
  switch (action.type) {
    case 'START': {
      const maxHp = class_hp[action.characterClass];
      return {
        name: action.name,
        characterClass: action.characterClass,
        hp: maxHp,
        maxHp,
        inventory: [],
        location: 'start',
      };
    }
    case 'MOVE': {
      const { effects = {} } = action;
      const hp = Math.min(state.maxHp, Math.max(0, state.hp + (effects.hp ?? 0)));
      let inventory = state.inventory;
      if (effects.addItem && !inventory.includes(effects.addItem)) {
        inventory = [...inventory, effects.addItem];
      }
      return { ...state, hp, inventory, location: action.target };
    }
    case 'RESTART': {
      return {
        ...state,
        hp: state.maxHp,
        inventory: [],
        location: 'start',
      };
    }
  }
}

type CharacterContextValue = {
  character: CharacterState;
  startGame: (name: string, characterClass: CharacterClass) => void;
  move: (target: string, effects?: Effects) => void;
  restart: () => void;
};

const CharacterContext = createContext<CharacterContextValue | undefined>(undefined);

export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const [character, dispatch] = useReducer(reducer, initialState);

  const value = useMemo<CharacterContextValue>(
    () => ({
      character,
      startGame: (name, characterClass) => dispatch({ type: 'START', name, characterClass }),
      move: (target, effects) => dispatch({ type: 'MOVE', target, effects }),
      restart: () => dispatch({ type: 'RESTART' }),
    }),
    [character],
  );

  return <CharacterContext.Provider value={value}>{children}</CharacterContext.Provider>;
}

export function useCharacter() {
  const ctx = useContext(CharacterContext);
  if (!ctx) throw new Error('useCharacter must be used inside CharacterProvider');
  return ctx;
}
