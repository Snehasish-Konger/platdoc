import i18n from 'i18next';
import 'intl-pluralrules';
import { initReactI18next } from 'react-i18next';
import {en,hi,bn} from './locals';
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      bn: { translation: bn },
      // other languages
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
