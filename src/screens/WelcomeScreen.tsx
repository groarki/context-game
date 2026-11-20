import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { CharacterClass, class_hp, useCharacter } from '../context/CharacterContext';
import { Kings_Font } from '../fonts';

const CLASSES: CharacterClass[] = ['warrior', 'mage', 'rogue'];

type Props = {
  onStart: () => void;
};

export default function WelcomeScreen({ onStart }: Props) {
  const { t } = useTranslation();
  const { toggleLanguage } = useLanguage();
  const { theme, colors, toggleTheme } = useTheme();
  const { startGame } = useCharacter();

  const [playerName, setPlayerName] = useState('');
  const [characterClass, setCharacterClass] = useState<CharacterClass>('warrior');
  const [showError, setShowError] = useState(false);

  const trimmedName = playerName.trim();

  const handleStart = () => {
    if (!trimmedName) {
      setShowError(true);
      return;
    }
    startGame(trimmedName, characterClass);
    onStart();
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.primary }]}>{t('welcome.title')}</Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.inputBackground,
              color: colors.text,
            },
          ]}
          placeholder={t('welcome.namePlaceholder')}
          placeholderTextColor={colors.textMuted}
          value={playerName}
          onChangeText={(text) => {
            setPlayerName(text);
            setShowError(false);
          }}
        />
        {showError && !trimmedName && (
          <Text style={[styles.error, { color: colors.danger }]}>{t('welcome.nameRequired')}</Text>
        )}

        {/* wybór klasy */}
        <Text style={[styles.sectionLabel, { color: colors.text }]}>{t('welcome.chooseClass')}</Text>
        <View style={styles.classRow}>
          {CLASSES.map((cls) => {
            const selected = cls === characterClass;
            return (
              <TouchableOpacity
                key={cls}
                style={[
                  styles.classButton,
                  {
                    backgroundColor: selected ? colors.selected : colors.card,
                  },
                ]}
                onPress={() => setCharacterClass(cls)}
              >
                <Text style={[styles.classText, { color: colors.text }]}>{t(`classes.${cls}`)}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
                
        {/* język */}
        <Text style={[styles.info, { color: colors.textMuted }]}>{t('welcome.currentLanguage')}</Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.button }]} onPress={toggleLanguage}>
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>{t('welcome.changeLanguage')}</Text>
        </TouchableOpacity>

        {/* wybór motywu */}
        <Text style={[styles.info, { color: colors.textMuted }]}>
          {t('welcome.currentTheme', { theme: t(`themes.${theme}`) })}
        </Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.button }]} onPress={toggleTheme}>
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>{t('welcome.changeTheme')}</Text>
        </TouchableOpacity>
        
        {/* powitanie */}
        {trimmedName !== '' && (
          <Text style={[styles.greeting, { color: colors.text }]}>
            {t('status.greeting', { playerName: trimmedName, hp: class_hp[characterClass] })}
          </Text>
        )}
        <TouchableOpacity
          style={[styles.button, styles.startButton, { backgroundColor: colors.primary }]}
          onPress={handleStart}
        >
          <Text style={[styles.startText, { color: colors.primaryText }]}>{t('welcome.start')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontFamily: Kings_Font, fontSize: 52, marginBottom: 32, fontWeight: 'bold' },
  input: { width: '85%', height: 50, borderRadius: 20, paddingHorizontal: 15, marginBottom: 8 },
  error: { width: '85%', fontSize: 13, marginBottom: 8 },
  sectionLabel: { width: '85%', fontFamily: Kings_Font, fontSize: 20, marginTop: 16, marginBottom: 8, textAlign: 'center' },
  classRow: { width: '85%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  classButton: { flex: 1, marginHorizontal: 3, paddingVertical: 10, borderRadius: 20, alignItems: 'center' },
  classText: { fontFamily: Kings_Font, fontSize: 18 },
  greeting: { width: '85%', fontSize: 18, marginTop: 14, textAlign: 'center' },
  info: { width: '85%', fontSize: 13, marginBottom: 4, textAlign: 'center' },
  button: { padding: 12, borderRadius: 20, width: '85%', alignItems: 'center', marginBottom: 10 },
  buttonText: { fontFamily: Kings_Font, fontSize: 18 },
  startButton: { marginTop: 16, paddingVertical: 16 },
  startText: { fontFamily: Kings_Font, fontSize: 20 },
});
