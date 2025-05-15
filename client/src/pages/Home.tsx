import VoiceAssistant from "@/components/VoiceAssistant";
import UserProfileCard from "@/components/UserProfileCard";
import IoTDeviceStatus from "@/components/IoTDeviceStatus";
import TasksList from "@/components/TasksList";
import WeatherCard from "@/components/WeatherCard";
import CropAdvisory from "@/components/CropAdvisory";
import LearningCard from "@/components/LearningCard";
import MarketplaceCard from "@/components/MarketplaceCard";
import GovernmentSchemes from "@/components/GovernmentSchemes";
import AIWeatherPredictor from "@/components/AIWeatherPredictor";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";

export default function Home() {
  const { translate } = useAppContext();
  const [showAIWeather, setShowAIWeather] = useState(false);

  return (
    <>
      <Helmet>
        <title>AgroSakhi 2.0 - ग्रामीण महिला किसानों का सशक्तिकरण</title>
        <meta name="description" content="AgroSakhi 2.0 किसान डैशबोर्ड - IoT उपकरण, फसल सलाह, मौसम जानकारी और कृषि सेवाएं" />
      </Helmet>
      
      <VoiceAssistant />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          <UserProfileCard />
          <IoTDeviceStatus />
          <TasksList />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            <div className="relative">
              {showAIWeather && (
                <div className="absolute inset-0 bg-white z-10 rounded-xl shadow-lg">
                  <button 
                    onClick={() => setShowAIWeather(false)}
                    className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1 shadow-md z-20"
                  >
                    <span className="material-icons">close</span>
                  </button>
                  <AIWeatherPredictor />
                </div>
              )}
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">{translate("weather")}</h3>
                <button 
                  onClick={() => setShowAIWeather(true)}
                  className="text-primary hover:text-primary-dark flex items-center text-sm"
                  title={translate("aiWeatherPrediction")}
                >
                  <span className="material-icons text-sm mr-1">smart_toy</span>
                  AI
                </button>
              </div>
              <WeatherCard />
            </div>
            <CropAdvisory />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <LearningCard />
            <MarketplaceCard />
          </div>
          
          <GovernmentSchemes />
        </div>
      </main>
    </>
  );
}
