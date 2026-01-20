import React, { createContext, useContext, useState, ReactNode } from 'react';
import translationsData from '../locales/translations.json';


type Locale = 'en' | 'uk' | 'es';

interface TranslationEntry {
  [key: string]: string;
}

interface Translations {
  [key: string]: {
    en: string;
    uk: string;
    es: string;
  };
}

const translations: Translations = translationsData;

interface LocalizationContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  translate: (key: string, variables?: Record<string, string | number>) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('uk');

  const translate = (key: string, variables?: Record<string, string | number>): string => {
    let text = translations[key]?.[locale] || key;

    if (variables) {
      Object.entries(variables).forEach(([varName, value]) => {
        text = text.replace(`{${varName}}`, String(value));
      });
    }

    return text;
  };

  return (
    <LocalizationContext.Provider value={{ locale, setLocale, translate }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};