import { useQuery } from "@tanstack/react-query";
import { Weather } from "@shared/schema";
import { useAppContext } from "@/contexts/AppContext";

export default function WeatherCard() {
  const { translate } = useAppContext();
  
  const { data: weather, isLoading } = useQuery<Weather>({
    queryKey: ['/api/weather'],
  });
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 lg:col-span-1 animate-pulse">
        <div className="flex justify-between items-center mb-3">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto"></div>
            <div className="mt-2 h-8 bg-gray-200 rounded w-16 mx-auto"></div>
            <div className="mt-1 h-4 bg-gray-200 rounded w-24 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }
  
  const getWeatherIcon = (condition: string) => {
    switch (condition?.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return 'wb_sunny';
      case 'cloudy':
      case 'partly cloudy':
        return 'wb_cloudy';
      case 'rainy':
      case 'rain':
        return 'water_drop';
      case 'stormy':
      case 'storm':
        return 'thunderstorm';
      default:
        return 'wb_sunny';
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 lg:col-span-1">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-display font-medium text-lg">{translate("weather")}</h3>
        <span className="text-xs text-gray-500 flex items-center">
          <span className="material-icons text-xs mr-1">update</span>
          <span>{weather?.updated || "30 minutes ago"}</span>
        </span>
      </div>
      
      <div className="flex items-center justify-center py-3">
        <div className="text-center">
          <span className={`material-icons text-secondary text-5xl`}>
            {getWeatherIcon(weather?.condition)}
          </span>
          <p className="mt-2 text-3xl font-medium">{weather?.temperature}</p>
          <p className="text-gray-500">{weather?.condition}</p>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="text-center p-2">
          <p className="text-xs text-gray-500">{translate("humidity")}</p>
          <div className="flex items-center justify-center mt-1">
            <span className="material-icons text-sm text-primary-light">water_drop</span>
            <span className="ml-1 text-sm">{weather?.humidity}</span>
          </div>
        </div>
        <div className="text-center p-2">
          <p className="text-xs text-gray-500">{translate("wind")}</p>
          <div className="flex items-center justify-center mt-1">
            <span className="material-icons text-sm text-primary-light">air</span>
            <span className="ml-1 text-sm">{weather?.wind}</span>
          </div>
        </div>
        <div className="text-center p-2">
          <p className="text-xs text-gray-500">{translate("rainfall")}</p>
          <div className="flex items-center justify-center mt-1">
            <span className="material-icons text-sm text-primary-light">umbrella</span>
            <span className="ml-1 text-sm">{weather?.rainfall}</span>
          </div>
        </div>
      </div>
      
      {weather?.alert && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-sm text-gray-800">
            <span className="material-icons text-warning inline-block align-text-bottom text-base mr-1">info</span>
            {weather.alert}
          </p>
        </div>
      )}
    </div>
  );
}
