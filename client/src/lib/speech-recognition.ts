import { APP_CONSTANTS } from './constants';

// Type definition for Web Speech API
// Add declaration for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

type SpeechRecognitionCallback = (transcript: string, final: boolean) => void;

// Speech recognition class
export class SpeechRecognizer {
  recognition: any;
  isListening: boolean = false;
  language: string;
  callback: SpeechRecognitionCallback | null = null;

  constructor(language = 'hi-IN') {
    this.language = language;
    
    // Check browser support
    if (typeof window !== 'undefined') {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognitionAPI) {
        this.recognition = new SpeechRecognitionAPI();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = this.language;
        
        this.recognition.onresult = (event: SpeechRecognitionEvent) => {
          if (this.callback) {
            const result = event.results[event.results.length - 1];
            const transcript = result[0].transcript;
            const isFinal = result.isFinal;
            
            this.callback(transcript, isFinal);
          }
        };
        
        this.recognition.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          this.isListening = false;
        };
        
        this.recognition.onend = () => {
          if (this.isListening) {
            // Auto restart if still in listening mode
            this.recognition.start();
          }
        };
      } else {
        console.error('Speech recognition not supported in this browser');
      }
    } else {
      console.error('Window is not defined, running in non-browser environment');
    }
  }
  
  setLanguage(language: string) {
    this.language = language;
    if (this.recognition) {
      this.recognition.lang = language === APP_CONSTANTS.LANGUAGES.HINDI ? 'hi-IN' : 'en-US';
    }
  }
  
  start(callback: SpeechRecognitionCallback) {
    if (!this.recognition) return;
    
    this.callback = callback;
    this.isListening = true;
    
    try {
      this.recognition.start();
    } catch (e) {
      console.error('Failed to start speech recognition', e);
      this.isListening = false;
    }
  }
  
  stop() {
    if (!this.recognition) return;
    
    this.isListening = false;
    try {
      this.recognition.stop();
    } catch (e) {
      console.error('Failed to stop speech recognition', e);
    }
  }
}

// Text-to-speech
export class SpeechSynthesizer {
  synth: SpeechSynthesis;
  language: string;
  
  constructor(language = 'hi-IN') {
    this.synth = window.speechSynthesis;
    this.language = language;
  }
  
  setLanguage(language: string) {
    this.language = language === APP_CONSTANTS.LANGUAGES.HINDI ? 'hi-IN' : 'en-US';
  }
  
  speak(text: string) {
    if (!this.synth) return;
    
    // Cancel any ongoing speech
    this.synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.language;
    
    this.synth.speak(utterance);
  }
  
  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

// Create dummy implementation for environments without speech support
class DummySpeechRecognizer extends SpeechRecognizer {
  constructor() {
    super();
    this.recognition = null;
  }
  
  start(callback: SpeechRecognitionCallback) {
    console.log("Speech recognition not available in this environment");
    callback("Speech recognition not available", true);
  }
  
  stop() {
    console.log("Speech recognition not available in this environment");
  }
}

class DummySpeechSynthesizer extends SpeechSynthesizer {
  constructor() {
    super();
    this.synth = window.speechSynthesis || {} as SpeechSynthesis;
  }
  
  speak(text: string) {
    console.log("Speech synthesis not available, would speak:", text);
  }
  
  stop() {
    console.log("Speech synthesis not available");
  }
}

// Instantiate the classes with fallbacks
let recognizer: SpeechRecognizer;
let synthesizer: SpeechSynthesizer;

try {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognitionAPI) {
      recognizer = new SpeechRecognizer();
      synthesizer = new SpeechSynthesizer();
    } else {
      recognizer = new DummySpeechRecognizer();
      synthesizer = new DummySpeechSynthesizer();
    }
  } else {
    // Server-side rendering fallback
    recognizer = new DummySpeechRecognizer();
    synthesizer = new DummySpeechSynthesizer();
  }
} catch (e) {
  console.error("Error initializing speech services:", e);
  recognizer = new DummySpeechRecognizer();
  synthesizer = new DummySpeechSynthesizer();
}

export { recognizer, synthesizer };
