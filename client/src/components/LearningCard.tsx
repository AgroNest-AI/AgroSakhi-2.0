import { useQuery } from "@tanstack/react-query";
import { Course } from "@shared/schema";
import { useAppContext } from "@/contexts/AppContext";

export default function LearningCard() {
  const { translate } = useAppContext();
  
  const { data: course, isLoading } = useQuery<Course>({
    queryKey: ['/api/courses/current'],
  });
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 transition-all duration-200 card-highlight animate-pulse">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div className="ml-2 h-6 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="mb-3">
          <div className="bg-gray-100 rounded-full h-3"></div>
          <div className="flex justify-between mt-1">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/6"></div>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden mb-4 h-40 bg-gray-200"></div>
      </div>
    );
  }
  
  const learningImageUrl = "https://pixabay.com/get/g879c8dd2e153ae668010862d632aa5ce15f14a4474ab1eafb8db843f3b8310a5d3c6352e243c702ca21414e05d77db85a8db3988b54f2a583cbeac2086cf106a_1280.jpg";
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 transition-all duration-200 card-highlight">
      <div className="flex items-center mb-4">
        <span className="material-icons text-accent text-2xl">school</span>
        <h3 className="font-display font-medium text-lg ml-2">{translate("academyTitle")}</h3>
      </div>
      
      <div className="mb-3">
        <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
          <div className="bg-accent h-full" style={{ width: `${course?.progress || 65}%` }}></div>
        </div>
        <div className="flex justify-between mt-1">
          <p className="text-xs text-gray-500">
            {translate("level")} {course?.level || 2} {translate("progress")}
          </p>
          <p className="text-xs font-medium">{course?.progress || 65}%</p>
        </div>
      </div>
      
      <div className="rounded-lg overflow-hidden mb-4">
        <img 
          src={learningImageUrl} 
          alt="Women in agricultural training" 
          className="w-full h-40 object-cover"
        />
      </div>
      
      <div className="p-3 bg-purple-50 rounded-lg mb-3 border-l-4 border-accent">
        <h4 className="font-medium text-gray-800">{course?.title || "Today's Lesson"}</h4>
        <p className="text-sm text-gray-600 mt-1">{course?.description}</p>
        <div className="mt-2 flex space-x-2">
          <button className="bg-accent text-white text-sm py-1 px-3 rounded-full flex items-center shadow-sm">
            <span className="material-icons text-sm mr-1">play_circle</span>
            {translate("startNow")}
          </button>
          <button className="bg-white border border-gray-200 text-gray-700 text-sm py-1 px-3 rounded-full flex items-center">
            <span className="material-icons text-sm mr-1">download</span>
            {translate("saveOffline")}
          </button>
        </div>
      </div>
      
      <button className="w-full py-2 text-accent border border-accent rounded-lg text-sm font-medium flex items-center justify-center">
        <span className="material-icons text-sm mr-1">auto_stories</span>
        {translate("viewCourses")}
      </button>
    </div>
  );
}
