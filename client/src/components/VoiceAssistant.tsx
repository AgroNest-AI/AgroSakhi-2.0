import { useAppContext } from "@/contexts/AppContext";
import { APP_CONSTANTS } from "@/lib/constants";

export default function VoiceAssistant() {
  const { 
    voiceAssistantState, 
    voiceAssistantText, 
    startVoiceAssistant, 
    stopVoiceAssistant 
  } = useAppContext();
  
  const handleVoiceButtonClick = () => {
    if (voiceAssistantState === APP_CONSTANTS.VOICE_ASSISTANT_STATES.IDLE) {
      startVoiceAssistant();
    } else {
      stopVoiceAssistant();
    }
  };
  
  const isActive = voiceAssistantState !== APP_CONSTANTS.VOICE_ASSISTANT_STATES.IDLE;
  
  return (
    <div className="sticky top-0 z-10 bg-white py-3 px-4 shadow-sm border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center w-full">
          <button 
            onClick={handleVoiceButtonClick}
            className={`voice-pulse h-10 w-10 rounded-full flex items-center justify-center shadow-lg ${
              isActive ? "bg-destructive" : "bg-secondary"
            }`}
          >
            <span className="material-icons text-white">mic</span>
          </button>
          <div className="ml-3 bg-gray-100 rounded-full px-4 py-2 flex-grow">
            <p className="text-gray-500 text-sm md:text-base">
              {voiceAssistantText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
