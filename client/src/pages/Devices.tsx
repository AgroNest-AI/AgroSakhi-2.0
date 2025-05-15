import VoiceAssistant from "@/components/VoiceAssistant";
import IoTDeviceStatus from "@/components/IoTDeviceStatus";
import { useAppContext } from "@/contexts/AppContext";
import { useQuery } from "@tanstack/react-query";
import { Device } from "@shared/schema";
import { Line } from "recharts";
import { Helmet } from "react-helmet";

export default function Devices() {
  const { translate } = useAppContext();
  
  const { data: devices, isLoading } = useQuery<Device[]>({
    queryKey: ['/api/devices'],
  });
  
  const { data: deviceHistory } = useQuery<any>({
    queryKey: ['/api/devices/history'],
  });
  
  return (
    <>
      <Helmet>
        <title>Devices - AgroSakhi 2.0</title>
        <meta name="description" content="Monitor and manage your AgroSakhi IoT devices, view sensor readings, and track field conditions." />
      </Helmet>
    
      <VoiceAssistant />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-display font-bold text-2xl text-gray-800 mb-6">
            {translate("devices")}
          </h1>
          
          <IoTDeviceStatus />
          
          <div className="mb-8">
            <h2 className="font-display font-bold text-xl text-gray-800 mb-4">
              {translate("sensorReadings") || "Sensor Readings"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* For a real application, we would use the Recharts library to visualize the sensor data */}
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <h3 className="font-display font-medium text-lg mb-4">
                  {translate("soilMoisture") || "Soil Moisture Trends"}
                </h3>
                
                {isLoading ? (
                  <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
                ) : (
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">
                      {translate("chartPlaceholder") || "Chart will be displayed here"}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <h3 className="font-display font-medium text-lg mb-4">
                  {translate("temperatureHumidity") || "Temperature & Humidity"}
                </h3>
                
                {isLoading ? (
                  <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
                ) : (
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">
                      {translate("chartPlaceholder") || "Chart will be displayed here"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="font-display font-bold text-xl text-gray-800 mb-4">
              {translate("deviceSettings") || "Device Settings"}
            </h2>
            
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="grid grid-cols-1 gap-4">
                {devices?.map(device => (
                  <div key={device.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className={`material-icons text-primary text-2xl mr-3`}>
                          {device.type === 'band' ? 'watch' : 'hub'}
                        </span>
                        <h3 className="font-display font-medium text-lg">{device.name}</h3>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-600 hover:text-primary rounded-full">
                          <span className="material-icons">settings</span>
                        </button>
                        <button className="p-2 text-gray-600 hover:text-primary rounded-full">
                          <span className="material-icons">sync</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
