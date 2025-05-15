import { useQuery } from "@tanstack/react-query";
import { Advisory } from "@shared/schema";
import { useAppContext } from "@/contexts/AppContext";
import { APP_CONSTANTS } from "@/lib/constants";

export default function CropAdvisory() {
  const { translate, connectionStatus } = useAppContext();
  
  const { data: advisories, isLoading } = useQuery<Advisory[]>({
    queryKey: ['/api/advisories'],
  });
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 lg:col-span-2 animate-pulse">
        <div className="flex justify-between items-center mb-3">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="rounded-lg overflow-hidden mb-3 h-48 bg-gray-200"></div>
        <div className="space-y-3">
          <div className="p-3 bg-gray-100 rounded-lg h-24"></div>
          <div className="p-3 bg-gray-100 rounded-lg h-32"></div>
        </div>
      </div>
    );
  }
  
  const advisoryImageUrl = "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400";
  
  const getAdvisoryClass = (type: string) => {
    switch (type) {
      case 'positive':
        return 'bg-green-50';
      case 'warning':
        return 'bg-yellow-50';
      case 'alert':
        return 'bg-red-50';
      default:
        return 'bg-green-50';
    }
  };
  
  const getAdvisoryIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return 'eco';
      case 'warning':
        return 'pest_control';
      case 'alert':
        return 'warning';
      default:
        return 'eco';
    }
  };
  
  const getAdvisoryIconClass = (type: string) => {
    switch (type) {
      case 'positive':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'alert':
        return 'text-error';
      default:
        return 'text-success';
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 lg:col-span-2">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-display font-medium text-lg">{translate("advisoryTitle")}</h3>
        <div className={`${
          connectionStatus === APP_CONSTANTS.CONNECTION_STATUS.ONLINE 
            ? 'online-indicator' 
            : 'offline-indicator'
        } text-xs text-${
          connectionStatus === APP_CONSTANTS.CONNECTION_STATUS.ONLINE 
            ? 'success' 
            : 'warning'
        }`}>
          {translate(connectionStatus)}
        </div>
      </div>
      
      <div className="rounded-lg overflow-hidden mb-3">
        <img 
          src={advisoryImageUrl} 
          alt="Woman checking crop status" 
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="space-y-3">
        {advisories?.map(advisory => (
          <div 
            key={advisory.id} 
            className={`p-3 ${getAdvisoryClass(advisory.type)} rounded-lg`}
          >
            <div className="flex">
              <span className={`material-icons ${getAdvisoryIconClass(advisory.type)} text-lg mr-2`}>
                {getAdvisoryIcon(advisory.type)}
              </span>
              <div>
                <h4 className="font-medium">{advisory.title}</h4>
                <p className="text-sm text-gray-700">{advisory.description}</p>
                
                {advisory.hasVideo && (
                  <div className="mt-2">
                    <button className="bg-white border border-primary text-primary text-sm py-1 px-3 rounded-full flex items-center shadow-sm">
                      <span className="material-icons text-sm mr-1">play_circle</span>
                      {translate("watchVideo")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
