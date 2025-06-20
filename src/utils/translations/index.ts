
import { enTranslations } from './en';
import { hiTranslations } from './hi';
import { teTranslations } from './te';

export const translations = {
  en: enTranslations,
  hi: hiTranslations,
  te: teTranslations
};

export const getTranslations = (language: string) => {
  return translations[language as keyof typeof translations] || translations.en;
};
