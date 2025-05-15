import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { APP_CONSTANTS, TRANSLATIONS } from '../lib/constants';
import { recognizer, synthesizer } from '../lib/speech-recognition';

interface AppContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  connectionStatus: string;
  setConnectionStatus: (status: string) => void;
  translate: (key: string) => string;
  voiceAssistantState: string;
  voiceAssistantText: string;
  startVoiceAssistant: () => void;
  stopVoiceAssistant: () => void;
  isDataLoading: boolean;
  setIsDataLoading: (loading: boolean) => void;
}

// Create a default context to avoid the undefined check
const defaultContextValue: AppContextType = {
  currentPage: APP_CONSTANTS.PAGES.HOME,
  setCurrentPage: () => {},
  language: APP_CONSTANTS.LANGUAGES.HINDI,
  setLanguage: () => {},
  connectionStatus: APP_CONSTANTS.CONNECTION_STATUS.ONLINE,
  setConnectionStatus: () => {},
  translate: (key) => key,
  voiceAssistantState: APP_CONSTANTS.VOICE_ASSISTANT_STATES.IDLE,
  voiceAssistantText: '',
  startVoiceAssistant: () => {},
  stopVoiceAssistant: () => {},
  isDataLoading: false,
  setIsDataLoading: () => {}
};

const AppContext = createContext<AppContextType>(defaultContextValue);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState(APP_CONSTANTS.PAGES.HOME);
  const [language, setLanguage] = useState(APP_CONSTANTS.LANGUAGES.HINDI);
  const [connectionStatus, setConnectionStatus] = useState(APP_CONSTANTS.CONNECTION_STATUS.ONLINE);
  const [voiceAssistantState, setVoiceAssistantState] = useState(APP_CONSTANTS.VOICE_ASSISTANT_STATES.IDLE);
  const [voiceAssistantText, setVoiceAssistantText] = useState('');
  const [isDataLoading, setIsDataLoading] = useState(false);

  // Create a simple translation function that doesn't depend on useCallback
  const getTranslation = (key: string): string => {
    if (!TRANSLATIONS[language]) return key;
    
    const translations = TRANSLATIONS[language] as Record<string, string>;
    return translations[key] || key;
  };

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => setConnectionStatus(APP_CONSTANTS.CONNECTION_STATUS.ONLINE);
    const handleOffline = () => setConnectionStatus(APP_CONSTANTS.CONNECTION_STATUS.OFFLINE);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Initialize the voice assistant text
  useEffect(() => {
    setVoiceAssistantText(getTranslation('voicePrompt'));
  }, [language]);

  // Update language for speech recognition
  useEffect(() => {
    if (recognizer && synthesizer) {
      recognizer.setLanguage(language);
      synthesizer.setLanguage(language);
    }
  }, [language]);
  
  // Create the memoized translate function that will be exposed in the context
  const translate = useCallback((key: string): string => {
    return getTranslation(key);
  }, [language]);

  // Voice assistant functions
  const startVoiceAssistant = useCallback(() => {
    setVoiceAssistantState(APP_CONSTANTS.VOICE_ASSISTANT_STATES.LISTENING);
    setVoiceAssistantText(translate('listening'));
    
    recognizer.start((transcript, isFinal) => {
      if (isFinal) {
        // In a real app, this would send the transcript to a backend for processing
        setVoiceAssistantState(APP_CONSTANTS.VOICE_ASSISTANT_STATES.PROCESSING);
        
        // Simulate response delay (would be replaced with actual API call)
        setTimeout(() => {
          // Mock response - in a real app this would come from the AI backend
          setVoiceAssistantState(APP_CONSTANTS.VOICE_ASSISTANT_STATES.RESPONDING);
          const dummyResponses = {
            [APP_CONSTANTS.LANGUAGES.HINDI]: "आपके धान के लिए NPK 15-15-15 उर्वरक की सिफारिश की जाती है। प्रति एकड़ 50 किलो का उपयोग करें।",
            [APP_CONSTANTS.LANGUAGES.ENGLISH]: "For your rice crop, NPK 15-15-15 fertilizer is recommended. Use 50 kg per acre."
          };
          
          const response = dummyResponses[language];
          setVoiceAssistantText(response);
          synthesizer.speak(response);
          
          // Reset after response
          setTimeout(() => {
            setVoiceAssistantState(APP_CONSTANTS.VOICE_ASSISTANT_STATES.IDLE);
            setVoiceAssistantText(translate('voicePrompt'));
          }, 5000);
        }, 1000);
      } else {
        setVoiceAssistantText(transcript);
      }
    });
  }, [translate, language]);

  const stopVoiceAssistant = useCallback(() => {
    recognizer.stop();
    synthesizer.stop();
    setVoiceAssistantState(APP_CONSTANTS.VOICE_ASSISTANT_STATES.IDLE);
    setVoiceAssistantText(translate('voicePrompt'));
  }, [translate]);

  const value = {
    currentPage,
    setCurrentPage,
    language,
    setLanguage,
    connectionStatus,
    setConnectionStatus,
    translate,
    voiceAssistantState,
    voiceAssistantText,
    startVoiceAssistant,
    stopVoiceAssistant,
    isDataLoading,
    setIsDataLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
