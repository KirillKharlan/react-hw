import React, { createContext, useContext, useState, ReactNode } from 'react';
import translationsData from '../shared/locales/translations.json';


export type Locale = 'en' | 'uk' | 'es' | 'de' | 'fr' | 'pl' | 'pt';

interface Translations {
  [key: string]: {
    [key in Locale]?: string;
  };
}

const translations: Translations = translationsData as Translations;

interface LocalizationContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  translate: (key: string, variables?: Record<string, string | number>) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('uk');

  const translate = (key: string, variables?: Record<string, string | number>): string => {
    let text = translations[key]?.[locale] || translations[key]?.['en'] || key;

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