import React, { createContext, useContext, useMemo, useState } from 'react';
import i18n, { Language } from '../i18n';

type LanguageContextValue = {
  language: Language;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(i18n.language as Language);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      toggleLanguage: () => {
        const next: Language = language === 'pl' ? 'en' : 'pl';
        setLanguage(next);
        i18n.changeLanguage(next);
      },
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
