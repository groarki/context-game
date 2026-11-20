import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import pl from './locales/pl.json';

export type Language = 'en' | 'pl';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pl: { translation: pl },
  },
  lng: 'pl',
  fallbackLng: 'en',
  initAsync: false,
  interpolation: {
    escapeValue: false,
    prefix: '{',
    suffix: '}',
  },
});

export default i18n;
