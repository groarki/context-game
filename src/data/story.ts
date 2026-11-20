import type { CharacterState, Effects } from '../context/CharacterContext';

/**
 * Structure of the paragraph game (language-independent).
 * Texts live in src/i18n/locales/*.json,
 * under keys story.<paragraphId>.text and story.<paragraphId>.choices.<choiceId>.
 */
export type Choice = {
  id: string;
  target: string;
  effects?: Effects;
};

export type Paragraph = {
  id: string;
  choices: Choice[];
};

export const STORY: Record<string, Paragraph> = {
  start: {
    id: 'start',
    choices: [
      { id: 'fight', target: 'end', effects: { hp: -6 } },
      { id: 'chest', target: 'end', effects: { addItem: 'potion' } },
    ],
  },
  end: { id: 'end', choices: [] },
};

export function getParagraph(character: CharacterState): Paragraph {
  return STORY[character.location] ?? STORY.start;
}
