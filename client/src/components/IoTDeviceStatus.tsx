import { useQuery } from "@tanstack/react-query";
import { Device } from "@shared/schema";
import { useAppContext } from "@/contexts/AppContext";

export default function IoTDeviceStatus() {
  const { translate } = useAppContext();
  
  const { data: devices, isLoading } = useQuery<Device[]>({
    queryKey: ['/api/devices'],
  });
  
  if (isLoading) {
    return (
      <div className="mb-8">
        <h2 className="font-display font-bold text-xl text-gray-800 mb-4 animate-pulse bg-gray-200 h-7 w-48 rounded"></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 animate-pulse">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="ml-3">
                    <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  const iotFieldImageUrl = "https://images.unsplash.com/photo-1620336655055-088d06e36bf0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=240";
  
  return (
    <div className="mb-8">
      <h2 className="font-display font-bold text-xl text-gray-800 mb-4">
        {translate("deviceStatus")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* AgroSakhi Band Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 transition-all duration-200 card-highlight">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <span className="material-icons text-primary text-2xl">watch</span>
              <div className="ml-3">
                <h3 className="font-display font-medium text-lg">AgroSakhi Band™</h3>
                <p className="text-sm text-green-600 flex items-center">
                  <span className="material-icons text-sm mr-1">battery_full</span>
                  <span>{devices?.[0]?.batteryLevel || "85%"} {translate("battery")}</span>
                </p>
              </div>
            </div>
            <div className="bg-success text-white text-xs rounded-full px-2 py-1">
              <span>{translate("connectedStatus")}</span>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">{translate("soil")}</p>
              <div className="mt-1 flex items-end justify-between">
                <p className="text-lg font-medium">{devices?.[0]?.soilMoisture || "42%"}</p>
                <span className="material-icons text-primary-light">water_drop</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">{translate("temperature")}</p>
              <div className="mt-1 flex items-end justify-between">
                <p className="text-lg font-medium">{devices?.[0]?.temperature || "32°C"}</p>
                <span className="material-icons text-warning">thermostat</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">{translate("humidity")}</p>
              <div className="mt-1 flex items-end justify-between">
                <p className="text-lg font-medium">{devices?.[0]?.humidity || "68%"}</p>
                <span className="material-icons text-secondary">humidity_mid</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">{translate("updateTime")}</p>
              <div className="mt-1 flex items-end justify-between">
                <p className="text-sm font-medium">{devices?.[0]?.lastUpdate || "10:45 AM"}</p>
                <span className="material-icons text-gray-400">schedule</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* SakhiSense Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 transition-all duration-200 card-highlight">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <span className="material-icons text-primary text-2xl">hub</span>
              <div className="ml-3">
                <h3 className="font-display font-medium text-lg">SakhiSense™ स्टेशन</h3>
                <p className="text-sm text-green-600 flex items-center">
                  <span className="material-icons text-sm mr-1">solar_power</span>
                  <span>{translate("solarPower")}</span>
                </p>
              </div>
            </div>
            <div className="bg-success text-white text-xs rounded-full px-2 py-1">
              <span>{translate("onlineStatus")}</span>
            </div>
          </div>
          
          <div className="mt-3 relative rounded-lg overflow-hidden h-48">
            <img 
              src={iotFieldImageUrl} 
              alt="SakhiSense Field Station" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <div className="flex items-center text-white">
                <span className="material-icons mr-1 text-sm">location_on</span>
                <span className="text-sm">{devices?.[1]?.location || "दक्षिण खेत"}</span>
              </div>
              <div className="flex items-center mt-1">
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="material-icons text-white text-sm">compost</span>
                    <span className="ml-1 text-sm text-white">pH: {devices?.[1]?.soilPH || "6.5"}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="material-icons text-white text-sm">pest_control</span>
                    <span className="ml-1 text-sm text-white">{translate("pest") || "कीट"}: {devices?.[1]?.pestLevel || "कम"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
