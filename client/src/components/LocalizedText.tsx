import { ReactNode } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { APP_CONSTANTS } from '@/lib/constants';

interface LocalizedTextProps {
  children: ReactNode;
  className?: string;
}

/**
 * Component that applies appropriate font styling based on the current language
 * Uses Noto Sans family fonts optimized for Indian languages
 */
export default function LocalizedText({ children, className = '' }: LocalizedTextProps) {
  const { language } = useAppContext();

  const getFontFamily = () => {
    switch (language) {
      case APP_CONSTANTS.LANGUAGES.HINDI:
        return 'font-[\'Noto Sans Devanagari\']';
      case APP_CONSTANTS.LANGUAGES.BENGALI:
        return 'font-[\'Noto Sans Bengali\']';
      case APP_CONSTANTS.LANGUAGES.TAMIL:
        return 'font-[\'Noto Sans Tamil\']';
      case APP_CONSTANTS.LANGUAGES.TELUGU:
        return 'font-[\'Noto Sans Telugu\']';
      case APP_CONSTANTS.LANGUAGES.KANNADA:
        return 'font-[\'Noto Sans Kannada\']';
      case APP_CONSTANTS.LANGUAGES.MALAYALAM:
        return 'font-[\'Noto Sans Malayalam\']';
      case APP_CONSTANTS.LANGUAGES.PUNJABI:
        return 'font-[\'Noto Sans Gurmukhi\']';
      case APP_CONSTANTS.LANGUAGES.GUJARATI:
        return 'font-[\'Noto Sans Gujarati\']';
      case APP_CONSTANTS.LANGUAGES.ODIA:
        return 'font-[\'Noto Sans Oriya\']';
      default:
        return 'font-[\'Noto Sans\']';
    }
  };

  return (
    <span className={`${getFontFamily()} ${className}`}>
      {children}
    </span>
  );
}