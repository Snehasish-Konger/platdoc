import i18n from 'i18next';
import 'intl-pluralrules';
import { initReactI18next } from 'react-i18next';
import languageData from './locals';
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: languageData.en }, // English
      bn: { translation: languageData.bn }, // Bengali
      hi: { translation: languageData.hi }, // Hindi
      gu: { translation: languageData.gu }, // Gujarati
      mr: { translation: languageData.mr }, // Marathi
      ta: { translation: languageData.ta }, // Tamil
      te: { translation: languageData.te }, // Telugu
      kn: { translation: languageData.kn }, // Kannada
      ml: { translation: languageData.ml }, // Malayalam
      pa: { translation: languageData.pa }, // Punjabi
      ur: { translation: languageData.ur }, // Urdu
      or: { translation: languageData.or }, // Oriya
      as: { translation: languageData.as }, // Assamese
      ks: { translation: languageData.ks }, // Kashmiri
      sd: { translation: languageData.sd }, // Sindhi
      ne: { translation: languageData.ne }, // Nepali
      ma: { translation: languageData.ma }, // Manipuri
      sa: { translation: languageData.sa }, // Sanskrit
      // other languages
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
