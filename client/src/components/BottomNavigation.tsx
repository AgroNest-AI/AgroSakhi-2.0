import { Link } from "wouter";
import { useAppContext } from "@/contexts/AppContext";
import { APP_CONSTANTS } from "@/lib/constants";

export default function BottomNavigation() {
  const { currentPage, translate } = useAppContext();
  
  const navItems = [
    { id: APP_CONSTANTS.PAGES.HOME, icon: "home", label: translate("home"), path: "/" },
    { id: APP_CONSTANTS.PAGES.DEVICES, icon: "hub", label: translate("devices"), path: "/devices" },
    { id: APP_CONSTANTS.PAGES.LEARN, icon: "school", label: translate("learn"), path: "/learn" },
    { id: APP_CONSTANTS.PAGES.MARKETPLACE, icon: "storefront", label: translate("marketplace"), path: "/marketplace" },
    { id: APP_CONSTANTS.PAGES.PROFILE, icon: "account_circle", label: translate("profile"), path: "/profile" },
  ];
  
  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-lg z-10">
      <div className="container mx-auto flex justify-around">
        {navItems.map(item => (
          <Link key={item.id} href={item.path}>
            <div className={`flex flex-col items-center py-2 flex-1 cursor-pointer ${
              currentPage === item.id 
                ? "text-primary border-t-2 border-primary" 
                : "text-gray-600"
            }`}>
              <span className="material-icons">{item.icon}</span>
              <span className="text-xs mt-1">{item.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
