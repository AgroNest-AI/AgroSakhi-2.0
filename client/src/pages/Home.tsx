import VoiceAssistant from "@/components/VoiceAssistant";
import UserProfileCard from "@/components/UserProfileCard";
import IoTDeviceStatus from "@/components/IoTDeviceStatus";
import TasksList from "@/components/TasksList";
import WeatherCard from "@/components/WeatherCard";
import CropAdvisory from "@/components/CropAdvisory";
import LearningCard from "@/components/LearningCard";
import MarketplaceCard from "@/components/MarketplaceCard";
import GovernmentSchemes from "@/components/GovernmentSchemes";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>AgroSakhi 2.0 - Empowering Rural Women Farmers</title>
        <meta name="description" content="AgroSakhi 2.0 home dashboard with IoT devices, tasks, weather, and agricultural advisory" />
      </Helmet>
      
      <VoiceAssistant />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          <UserProfileCard />
          <IoTDeviceStatus />
          <TasksList />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            <WeatherCard />
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
