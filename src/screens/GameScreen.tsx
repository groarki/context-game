import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../context/ThemeContext';
import { useCharacter } from '../context/CharacterContext';
import { getParagraph } from '../data/story';
import { useGameTranslation } from '../hooks/useGameTranslation';
import { Kings_Font } from '../fonts';

export default function GameScreen({ onMenu }: { onMenu: () => void }) {
  const { t } = useGameTranslation();
  const { colors } = useTheme();
  const { character, move, restart } = useCharacter();

  const paragraph = getParagraph(character);
  const isEnd = paragraph.choices.length === 0;

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.primary }]}>{character.name}</Text>
        <Text style={[styles.status, { color: colors.textMuted }]}>{t('status.class')}</Text>
        <Text style={[styles.status, { color: colors.textMuted }]}>{t('status.hp')}</Text>
        <Text style={[styles.status, { color: colors.textMuted }]}>{t('status.inventory')}</Text>

        <Text style={[styles.paragraph, { color: colors.text }]}>{t(`story.${paragraph.id}.text`)}</Text>

        {paragraph.choices.map((choice) => (
          <TouchableOpacity
            key={choice.id}
            style={[styles.choice, { backgroundColor: colors.card}]}
            onPress={() => move(choice.target, choice.effects)}
          >
            <Text style={[styles.choiceText, { color: colors.text }]}>
              {t(`story.${paragraph.id}.choices.${choice.id}`)}
            </Text>
          </TouchableOpacity>
        ))}

        {isEnd && (
          <TouchableOpacity style={[styles.choice, { backgroundColor: colors.primary }]} onPress={restart}>
            <Text style={[styles.choiceText, { color: colors.primaryText }]}>{t('game.restart')}</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: colors.button }]}
        onPress={onMenu}
        accessibilityLabel={t('game.backToMenu')}
      >
        <Ionicons name="arrow-back" size={28} color={colors.buttonText} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center' },
  content: { flex: 1, width: '85%', justifyContent: 'center', alignItems: 'center' },
  name: { fontFamily: Kings_Font, fontSize: 32, marginBottom: 8 },
  status: { fontSize: 14, marginBottom: 2 },
  paragraph: { fontSize: 17, lineHeight: 26, textAlign: 'center', marginVertical: 24 },
  choice: { width: '100%', borderWidth: 1, borderColor: 'transparent', borderRadius: 8, paddingVertical: 18, paddingHorizontal: 16, marginBottom: 12, alignItems: 'center' },
  choiceText: { fontFamily: Kings_Font, fontSize: 18 },
  backButton: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
});
