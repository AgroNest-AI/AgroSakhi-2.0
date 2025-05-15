import { useQuery } from "@tanstack/react-query";
import { MarketInfo } from "@shared/schema";
import { useAppContext } from "@/contexts/AppContext";

export default function MarketplaceCard() {
  const { translate } = useAppContext();
  
  const { data: market, isLoading } = useQuery<MarketInfo>({
    queryKey: ['/api/market'],
  });
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 transition-all duration-200 card-highlight animate-pulse">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div className="ml-2 h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-6 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="space-y-1">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-6 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="space-y-1">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-6 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 transition-all duration-200 card-highlight">
      <div className="flex items-center mb-4">
        <span className="material-icons text-secondary text-2xl">storefront</span>
        <h3 className="font-display font-medium text-lg ml-2">{translate("marketplace")}</h3>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500">{translate("lastSale")}</p>
          <p className="text-lg font-medium text-gray-800">₹ {market?.lastSale || "45,280"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">{translate("currentProduct")}</p>
          <p className="text-lg font-medium text-gray-800">{market?.currentProduct || "धान: 280 kg"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">{translate("marketPrice")}</p>
          <p className="text-lg font-medium text-success">₹ {market?.price || "22"}/kg</p>
        </div>
      </div>
      
      <div className="p-3 bg-orange-50 rounded-lg mb-4 border-l-4 border-secondary">
        <h4 className="font-medium text-gray-800">{market?.groupSale?.title}</h4>
        <p className="text-sm text-gray-600 mt-1">{market?.groupSale?.description}</p>
        <div className="mt-2">
          <div className="flex items-center">
            <span className="material-icons text-sm text-gray-500 mr-1">group</span>
            <span className="text-xs text-gray-600">{market?.groupSale?.participated || "12"}/{market?.groupSale?.total || "15"} किसान शामिल</span>
          </div>
          <div className="mt-1 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-secondary h-full" 
              style={{ width: `${(market?.groupSale?.participated || 12) / (market?.groupSale?.total || 15) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="mt-3">
          <button className="bg-secondary text-white text-sm py-1 px-3 rounded-full flex items-center shadow-sm">
            <span className="material-icons text-sm mr-1">handshake</span>
            {translate("joinGroup")}
          </button>
        </div>
      </div>
      
      <div className="flex space-x-3">
        <button className="flex-1 py-2 bg-secondary text-white rounded-lg text-sm font-medium flex items-center justify-center">
          <span className="material-icons text-sm mr-1">shopping_bag</span>
          {translate("viewMarket")}
        </button>
        <button className="flex-1 py-2 border border-secondary text-secondary rounded-lg text-sm font-medium flex items-center justify-center">
          <span className="material-icons text-sm mr-1">add_circle</span>
          {translate("addProduct")}
        </button>
      </div>
    </div>
  );
}
