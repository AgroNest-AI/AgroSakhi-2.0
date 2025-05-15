import { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { APP_CONSTANTS } from '@/lib/constants';

export default function LanguageSelector() {
  const { language, setLanguage } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectLanguage = (lang: string) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  // Create a type-safe accessor function for language names
  const getLanguageName = (lang: string): string => {
    const languageNames = APP_CONSTANTS.LANGUAGE_NAMES as Record<string, string>;
    return languageNames[lang] || lang;
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="p-2 rounded-full hover:bg-white/20 flex items-center"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="material-icons mr-1">translate</span>
        <span className="hidden md:inline text-sm">{getLanguageName(language)}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {Object.values(APP_CONSTANTS.LANGUAGES).map((lang) => (
              <button
                key={lang}
                className={`w-full text-left px-4 py-2 text-sm ${
                  language === lang ? 'bg-gray-100 text-primary font-medium' : 'text-gray-700'
                } hover:bg-gray-100 flex items-center`}
                role="menuitem"
                onClick={() => selectLanguage(lang)}
              >
                {language === lang && <span className="material-icons text-primary mr-2 text-sm">check</span>}
                <span className={language === lang ? 'ml-0' : 'ml-6'}>
                  {getLanguageName(lang)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}