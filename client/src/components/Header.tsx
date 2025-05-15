import { useAppContext } from "@/contexts/AppContext";
import { APP_CONSTANTS } from "@/lib/constants";
import LanguageSelector from "./LanguageSelector";

export default function Header() {
  const { connectionStatus, translate } = useAppContext();
  
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
          <LanguageSelector />
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
