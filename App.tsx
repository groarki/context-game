import './src/i18n';

import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { CharacterProvider } from './src/context/CharacterContext';
import WelcomeScreen from './src/screens/WelcomeScreen';
import GameScreen from './src/screens/GameScreen';
import { Kings_Font } from './src/fonts';

type Screen = 'welcome' | 'game';


function Navigator() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const { theme } = useTheme();

  const goToMenu = () => setScreen('welcome');

  const content =
    screen === 'welcome' ? (
      <WelcomeScreen onStart={() => setScreen('game')} />
    ) : (
      <GameScreen onMenu={goToMenu} />
    );

  return (
    <>
      {content}
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({ [Kings_Font]: require('./assets/fonts/Kings-Regular.ttf') });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LanguageProvider>
          <CharacterProvider>
            <Navigator />
          </CharacterProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
