import { useAppContext } from "@/contexts/AppContext";
import { APP_CONSTANTS } from "@/lib/constants";

export default function Header() {
  const { connectionStatus, translate, setLanguage, language } = useAppContext();
  
  const toggleLanguage = () => {
    const newLanguage = language === APP_CONSTANTS.LANGUAGES.HINDI 
      ? APP_CONSTANTS.LANGUAGES.ENGLISH 
      : APP_CONSTANTS.LANGUAGES.HINDI;
    setLanguage(newLanguage);
  };
  
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container px-4 py-3 mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="material-icons text-3xl">agriculture</span>
          <h1 className="font-display font-bold text-lg md:text-xl">AgroSakhi 2.0</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`${connectionStatus === APP_CONSTANTS.CONNECTION_STATUS.ONLINE ? 'online-indicator' : 'offline-indicator'} text-sm font-medium hidden md:flex`}>
            {translate(connectionStatus)}
          </div>
          <button 
            onClick={toggleLanguage}
            className="p-2 rounded-full hover:bg-white/20"
            title={language === APP_CONSTANTS.LANGUAGES.HINDI ? "Switch to English" : "हिंदी में स्विच करें"}
          >
            <span className="material-icons">translate</span>
          </button>
          <button className="p-2 rounded-full hover:bg-white/20">
            <span className="material-icons">notifications</span>
          </button>
          <button className="md:hidden p-2 rounded-full hover:bg-white/20">
            <span className="material-icons">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
