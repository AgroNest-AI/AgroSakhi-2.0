import VoiceAssistant from "@/components/VoiceAssistant";
import { useAppContext } from "@/contexts/AppContext";
import MarketplaceCard from "@/components/MarketplaceCard";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Helmet } from "react-helmet";

export default function Marketplace() {
  const { translate } = useAppContext();
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });
  
  return (
    <>
      <Helmet>
        <title>Marketplace - AgroSakhi 2.0</title>
        <meta name="description" content="AgroChain Marketplace connects rural women farmers with fair-price buyers for agricultural produce." />
      </Helmet>
    
      <VoiceAssistant />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-display font-bold text-2xl text-gray-800 mb-6">
            {translate("marketplace")}
          </h1>
          
          <div className="mb-6">
            <MarketplaceCard />
          </div>
          
          <div className="mb-8">
            <h2 className="font-display font-bold text-xl text-gray-800 mb-4">
              {translate("availableProducts") || "Available Products"}
            </h2>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 animate-pulse">
                    <div className="h-32 bg-gray-200 rounded-lg mb-3"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div className="flex justify-between">
                      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products?.map(product => (
                  <div key={product.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 transition-all duration-200 card-highlight">
                    <div className="rounded-lg overflow-hidden mb-3 h-32 bg-gray-100 flex items-center justify-center">
                      <span className="material-icons text-secondary text-6xl opacity-50">eco</span>
                    </div>
                    <h3 className="font-display font-medium text-lg mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-medium text-success">
                        ₹ {product.price}/kg
                      </div>
                      <button className="bg-secondary text-white text-sm py-1 px-3 rounded-full flex items-center shadow-sm">
                        <span className="material-icons text-sm mr-1">shopping_bag</span>
                        {translate("viewDetails") || "View Details"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
