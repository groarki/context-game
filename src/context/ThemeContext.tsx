import React, { createContext, useContext, useMemo, useState } from 'react';

export type ThemeName = 'light' | 'dark';

export type ThemeColors = {
  background: string;
  card: string;
  text: string;
  textMuted: string;
  inputBackground: string;
  button: string;
  buttonText: string;
  primary: string;
  primaryText: string;
  selected: string;
  danger: string;
};

const themes: Record<ThemeName, ThemeColors> = {
  light: {
    background: '#ffaa6a',
    card: '#ffffff',
    text: '#34180d',
    textMuted: '#6b5d50',
    inputBackground: '#ffffff',
    button: '#67340d',
    buttonText: '#ffffff',
    primary: '#2f210d',
    primaryText: '#ffffff',
    selected: '#ffd49d',
    danger: '#b3261e',
  },
  dark: {
    background: '#14121a',
    card: '#221f2b',
    text: '#ece6f0',
    textMuted: '#a49cae',
    inputBackground: '#2a2634',
    button: '#4a4556',
    buttonText: '#ece6f0',
    primary: '#c9a227',
    primaryText: '#14121a',
    selected: '#3f3650',
    danger: '#ef6b62',
  },
};

type ThemeContextValue = {
  theme: ThemeName;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>('light');

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      colors: themes[theme],
      toggleTheme: () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
