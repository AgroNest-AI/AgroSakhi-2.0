import { useQuery } from "@tanstack/react-query";
import { Scheme } from "@shared/schema";
import { useAppContext } from "@/contexts/AppContext";

export default function GovernmentSchemes() {
  const { translate } = useAppContext();
  
  const { data: schemes, isLoading } = useQuery<Scheme[]>({
    queryKey: ['/api/schemes'],
  });
  
  if (isLoading) {
    return (
      <div className="mb-8">
        <h2 className="font-display font-bold text-xl text-gray-800 mb-4 animate-pulse bg-gray-200 h-7 w-48 rounded"></h2>
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[1, 2].map((_, i) => (
              <div key={i} className="p-3 border border-gray-200 rounded-lg animate-pulse">
                <div className="flex justify-between">
                  <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-5 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mt-2"></div>
                <div className="mt-4 flex space-x-4">
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mb-8">
      <h2 className="font-display font-bold text-xl text-gray-800 mb-4">
        {translate("schemes")}
      </h2>
      <div className="bg-white rounded-xl shadow-sm p-4 mb-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {schemes?.map(scheme => (
            <div 
              key={scheme.id} 
              className="p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors duration-200"
            >
              <div className="flex justify-between">
                <h4 className="font-medium text-gray-800">{scheme.title}</h4>
                <span className={`bg-${scheme.status === 'open' ? 'green' : 'blue'}-100 text-${scheme.status === 'open' ? 'green' : 'blue'}-700 text-xs px-2 py-0.5 rounded-full`}>
                  {scheme.statusText}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{scheme.description}</p>
              <div className="mt-2 flex items-center">
                <button className="text-primary text-sm font-medium flex items-center">
                  <span className="material-icons text-sm mr-1">description</span>
                  {translate("viewDetails")}
                </button>
                <span className="mx-2 text-gray-300">|</span>
                <button className="text-primary text-sm font-medium flex items-center">
                  <span className="material-icons text-sm mr-1">check_circle</span>
                  {translate("apply")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
