import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { useAppContext } from "@/contexts/AppContext";

export default function UserProfileCard() {
  const { translate } = useAppContext();
  
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['/api/user'],
  });
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4 mb-8 flex items-center animate-pulse">
        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        <div className="ml-4 space-y-2 flex-1">
          <div className="h-5 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }
  
  const userImageUrl = "https://pixabay.com/get/g9c54d1e3e149d64abb424bae2c8ab80e7cd53e641f25d43907a79c8cd6ef33dc54718a66afd29ff487cb459b741989a3eb6d0b0a528c5e3b62f557c41f244a99_1280.jpg";
  
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-8 flex items-center">
      <img 
        src={userImageUrl} 
        alt={user?.username} 
        className="w-16 h-16 rounded-full object-cover border-2 border-primary"
      />
      <div className="ml-4">
        <h2 className="font-display font-bold text-lg text-gray-800">
          {user?.username}
        </h2>
        <p className="text-sm text-gray-600">
          <span className="inline-flex items-center">
            <span className="material-icons text-xs mr-1">location_on</span>
            {user?.location || "राजस्थान, भारत"}
          </span>
        </p>
        <div className="mt-1 flex items-center">
          <div className="bg-primary-light text-white text-xs rounded-full px-2 py-0.5 mr-2">
            {translate("level")} {user?.level || 2} {translate("home")}
          </div>
          <div className="flex items-center text-xs">
            <span className="material-icons text-secondary text-sm">star</span>
            <span className="ml-1">{user?.points || 125} {translate("points")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
