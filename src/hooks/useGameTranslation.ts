import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useCharacter } from '../context/CharacterContext';

/**
 * Wrapper around react-i18next's useTranslation.
 * Every translated string automatically receives the current character state,
 * so placeholders like {playerName}, {hp}, {maxHp}, {className}, {items}
 * in the JSON files are replaced in real time (re-render on every change
 * of the character or of the language).
 */
export function useGameTranslation() {
  const { t } = useTranslation();
  const { character } = useCharacter();

  const tg = useCallback(
    (key: string) => {
      const items = character.inventory.length
        ? character.inventory.map((id) => t(`items.${id}`)).join(', ')
        : t('status.emptyInventory');

      return t(key, {
        playerName: character.name,
        hp: character.hp,
        maxHp: character.maxHp,
        className: t(`classes.${character.characterClass}`),
        items,
      });
    },
    [t, character],
  );

  return { t: tg };
}
