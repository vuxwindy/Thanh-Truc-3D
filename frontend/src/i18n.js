import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enTranslation from './locales/en/translation.json';
import viTranslation from './locales/vi/translation.json';
import zhTranslation from './locales/zh/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  vi: {
    translation: viTranslation
  },
  zh: {
    translation: zhTranslation
  }
};

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

// Update document title based on language
i18n.on('languageChanged', (lng) => {
  const titles = {
    en: 'Web2D - Digital Gaming Platform',
    vi: 'Web2D - Nền tảng trò chơi kỹ thuật số',
    zh: 'Web2D - 数字游戏平台'
  };
  
  document.title = titles[lng] || titles.en;
  document.documentElement.lang = lng;
});

export default i18n;