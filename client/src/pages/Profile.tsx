import VoiceAssistant from "@/components/VoiceAssistant";
import { useAppContext } from "@/contexts/AppContext";
import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { Helmet } from "react-helmet";

export default function Profile() {
  const { translate } = useAppContext();
  
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['/api/user'],
  });
  
  const userImageUrl = "https://pixabay.com/get/g9c54d1e3e149d64abb424bae2c8ab80e7cd53e641f25d43907a79c8cd6ef33dc54718a66afd29ff487cb459b741989a3eb6d0b0a528c5e3b62f557c41f244a99_1280.jpg";
  
  return (
    <>
      <Helmet>
        <title>Profile - AgroSakhi 2.0</title>
        <meta name="description" content="Manage your AgroSakhi profile, achievements, and farmer statistics." />
      </Helmet>
    
      <VoiceAssistant />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-display font-bold text-2xl text-gray-800 mb-6">
            {translate("profile")}
          </h1>
          
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            {isLoading ? (
              <div className="animate-pulse">
                <div className="flex flex-col md:flex-row items-center mb-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 md:mb-0 md:mr-6"></div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="h-7 bg-gray-200 rounded w-1/3 mb-2 mx-auto md:mx-0"></div>
                    <div className="h-5 bg-gray-200 rounded w-1/4 mb-2 mx-auto md:mx-0"></div>
                    <div className="h-5 bg-gray-200 rounded w-2/5 mx-auto md:mx-0"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center mb-6">
                <img 
                  src={userImageUrl} 
                  alt={user?.username} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-primary mb-4 md:mb-0 md:mr-6"
                />
                <div className="flex-1 text-center md:text-left">
                  <h2 className="font-display font-bold text-2xl text-gray-800">
                    {user?.username}
                  </h2>
                  <p className="text-gray-600">
                    <span className="inline-flex items-center">
                      <span className="material-icons text-sm mr-1">location_on</span>
                      {user?.location || "राजस्थान, भारत"}
                    </span>
                  </p>
                  <div className="mt-2 flex flex-wrap items-center justify-center md:justify-start">
                    <div className="bg-primary text-white text-sm rounded-full px-3 py-1 mr-2 mb-2">
                      {translate("level")} {user?.level || 2} {translate("home")}
                    </div>
                    <div className="flex items-center text-sm bg-secondary-light text-secondary-dark rounded-full px-3 py-1 mb-2">
                      <span className="material-icons text-sm mr-1">star</span>
                      <span>{user?.points || 125} {translate("points")}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <span className="material-icons text-primary text-2xl">inventory</span>
                <p className="text-sm text-gray-500 mt-1">{translate("totalHarvest") || "Total Harvest"}</p>
                <p className="text-xl font-medium mt-1">{user?.totalHarvest || "1,250"} kg</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <span className="material-icons text-secondary text-2xl">payments</span>
                <p className="text-sm text-gray-500 mt-1">{translate("totalEarnings") || "Total Earnings"}</p>
                <p className="text-xl font-medium mt-1">₹ {user?.totalEarnings || "72,500"}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <span className="material-icons text-accent text-2xl">school</span>
                <p className="text-sm text-gray-500 mt-1">{translate("completedCourses") || "Completed Courses"}</p>
                <p className="text-xl font-medium mt-1">{user?.completedCourses || "8"}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-display font-medium text-lg mb-4">
                {translate("accountSettings") || "Account Settings"}
              </h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="material-icons text-gray-500 mr-3">translate</span>
                    <div>
                      <p className="font-medium">{translate("language") || "Language"}</p>
                      <p className="text-sm text-gray-500">{translate("languagePreference") || "Choose your preferred language"}</p>
                    </div>
                  </div>
                  <button className="p-2 text-primary">
                    <span className="material-icons">chevron_right</span>
                  </button>
                </div>
                
                <div className="p-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="material-icons text-gray-500 mr-3">notifications</span>
                    <div>
                      <p className="font-medium">{translate("notifications") || "Notifications"}</p>
                      <p className="text-sm text-gray-500">{translate("notificationSettings") || "Manage alerts and reminders"}</p>
                    </div>
                  </div>
                  <button className="p-2 text-primary">
                    <span className="material-icons">chevron_right</span>
                  </button>
                </div>
                
                <div className="p-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="material-icons text-gray-500 mr-3">help</span>
                    <div>
                      <p className="font-medium">{translate("help") || "Help & Support"}</p>
                      <p className="text-sm text-gray-500">{translate("helpDescription") || "Contact support, FAQs, feedback"}</p>
                    </div>
                  </div>
                  <button className="p-2 text-primary">
                    <span className="material-icons">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
