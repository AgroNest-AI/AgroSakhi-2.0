import { useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { predictWeather } from '@/lib/openai';

export default function AIWeatherPredictor() {
  const { translate, language } = useAppContext();
  const [forecast, setForecast] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState('बीकानेर, राजस्थान');
  const [days, setDays] = useState(7);
  
  const loadForecast = async () => {
    setIsLoading(true);
    try {
      const result = await predictWeather(location, days);
      setForecast(result);
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Weather condition icons
  const getWeatherIcon = (condition: string) => {
    if (condition.includes('बारिश') || condition.includes('rain')) {
      return 'rainy';
    } else if (condition.includes('बादल') || condition.includes('cloud')) {
      return 'cloud';
    } else if (condition.includes('गरज') || condition.includes('thunder')) {
      return 'thunderstorm';
    } else {
      return 'wb_sunny';
    }
  };

  // Format dates according to language
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (language === 'hindi') {
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
      };
      return new Intl.DateTimeFormat('hi-IN', options).format(date);
    } else {
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
      };
      return new Intl.DateTimeFormat('en-IN', options).format(date);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-blue-50">
        <h3 className="text-lg font-bold text-primary flex items-center">
          <span className="material-icons mr-2">cloud</span>
          {translate('aiWeatherPrediction')}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {translate('aiWeatherDescription')}
        </p>
      </div>

      <div className="p-4">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={translate('enterLocation')}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm"
            >
              <option value="3">3 {translate('days')}</option>
              <option value="5">5 {translate('days')}</option>
              <option value="7">7 {translate('days')}</option>
            </select>
            <button
              onClick={loadForecast}
              disabled={isLoading}
              className={`px-4 py-2 rounded-md ${
                isLoading ? 'bg-gray-400' : 'bg-primary hover:bg-primary-dark'
              } text-white`}
            >
              {isLoading ? (
                <span className="material-icons animate-spin">autorenew</span>
              ) : (
                translate('getForecast')
              )}
            </button>
          </div>

          {forecast && (
            <div className="mt-2">
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2">
                {forecast.forecast.map((day: any, index: number) => (
                  <div
                    key={index}
                    className="bg-blue-50 rounded-lg p-2 text-center"
                  >
                    <p className="text-xs font-medium">{formatDate(day.date)}</p>
                    <span className="material-icons text-2xl my-1 text-blue-600">
                      {getWeatherIcon(day.condition)}
                    </span>
                    <p className="text-sm">
                      {day.temperature.max}°C / {day.temperature.min}°C
                    </p>
                    <p className="text-xs text-gray-600">{day.condition}</p>
                    {day.rainfall > 0 && (
                      <p className="text-xs text-blue-600 mt-1">
                        <span className="material-icons text-xs">water_drop</span> {day.rainfall} mm
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-yellow-50 p-3 rounded-lg">
                <h4 className="font-medium text-sm">{translate('farmingAdvice')}</h4>
                <ul className="mt-1 text-sm">
                  {forecast.advisories.map((advisory: string, index: number) => (
                    <li key={index} className="flex items-start mt-1">
                      <span className="material-icons text-amber-600 text-sm mr-1">eco</span>
                      <span>{advisory}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}