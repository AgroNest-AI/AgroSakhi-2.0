import VoiceAssistant from "@/components/VoiceAssistant";
import { useAppContext } from "@/contexts/AppContext";
import LearningCard from "@/components/LearningCard";
import { useQuery } from "@tanstack/react-query";
import { Course } from "@shared/schema";
import { Helmet } from "react-helmet";

export default function Learn() {
  const { translate } = useAppContext();
  
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ['/api/courses'],
  });
  
  return (
    <>
      <Helmet>
        <title>Learning Academy - AgroSakhi 2.0</title>
        <meta name="description" content="SakhiShakti Academy provides agricultural training, digital skills, and knowledge resources for rural women farmers." />
      </Helmet>
    
      <VoiceAssistant />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-display font-bold text-2xl text-gray-800 mb-6">
            {translate("academyTitle")}
          </h1>
          
          <div className="mb-6">
            <LearningCard />
          </div>
          
          <div className="mb-8">
            <h2 className="font-display font-bold text-xl text-gray-800 mb-4">
              {translate("allCourses") || "All Courses"}
            </h2>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 animate-pulse">
                    <div className="h-32 bg-gray-200 rounded-lg mb-3"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/3 mt-4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses?.map(course => (
                  <div key={course.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 transition-all duration-200 card-highlight">
                    <div className="rounded-lg overflow-hidden mb-3 h-32 bg-gray-100 flex items-center justify-center">
                      <span className="material-icons text-accent text-6xl opacity-50">{course.icon || "school"}</span>
                    </div>
                    <h3 className="font-display font-medium text-lg mb-1">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {course.lessons} {translate("lessons") || "lessons"}
                      </div>
                      <button className="bg-accent text-white text-sm py-1 px-3 rounded-full flex items-center shadow-sm">
                        <span className="material-icons text-sm mr-1">play_circle</span>
                        {translate("startNow")}
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
