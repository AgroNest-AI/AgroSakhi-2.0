import { useQuery, useMutation } from "@tanstack/react-query";
import { Task } from "@shared/schema";
import { useAppContext } from "@/contexts/AppContext";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function TasksList() {
  const { translate } = useAppContext();
  
  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ['/api/tasks'],
  });
  
  const startTaskMutation = useMutation({
    mutationFn: async (taskId: number) => {
      await apiRequest('POST', `/api/tasks/${taskId}/start`, null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
    }
  });
  
  const getTaskStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-success';
      case 'pending':
        return 'bg-gray-50 border-primary';
      case 'important':
        return 'bg-orange-50 border-warning';
      default:
        return 'bg-gray-50 border-primary';
    }
  };
  
  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return 'check_circle';
      case 'pending':
        return 'pending_actions';
      case 'important':
        return 'warning';
      default:
        return 'pending_actions';
    }
  };
  
  const getTaskStatusIconClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'pending':
        return 'text-primary';
      case 'important':
        return 'text-warning';
      default:
        return 'text-primary';
    }
  };
  
  if (isLoading) {
    return (
      <div className="mb-8">
        <h2 className="font-display font-bold text-xl text-gray-800 mb-4 animate-pulse bg-gray-200 h-7 w-36 rounded"></h2>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg border-l-4 border-gray-200 animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
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
        {translate("tasks")}
      </h2>
      <div className="bg-white rounded-xl shadow-sm p-4 mb-8 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="material-icons text-primary">checklist</span>
            <h3 className="font-display font-medium text-lg ml-2">{translate("taskList")}</h3>
          </div>
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString(translate === undefined ? 'en-US' : 'hi-IN', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long' 
            })}
          </p>
        </div>
        
        <div className="space-y-3">
          {tasks?.map(task => (
            <div 
              key={task.id} 
              className={`flex items-start p-3 rounded-lg border-l-4 ${getTaskStatusClass(task.status)}`}
            >
              <span className={`material-icons ${getTaskStatusIconClass(task.status)}`}>
                {getTaskStatusIcon(task.status)}
              </span>
              <div className="ml-3">
                <p className="text-gray-800 font-medium">{task.title}</p>
                <p className="text-xs text-gray-500">{task.time} - {translate(task.status)}</p>
                
                {task.status !== 'completed' && (
                  <div className="mt-2">
                    {task.status === 'pending' ? (
                      <button 
                        onClick={() => startTaskMutation.mutate(task.id)}
                        disabled={startTaskMutation.isPending}
                        className="bg-primary text-white text-sm py-1 px-3 rounded-full flex items-center"
                      >
                        <span className="material-icons text-sm mr-1">play_arrow</span>
                        {translate("startTask")}
                      </button>
                    ) : (
                      <button className="bg-white border border-primary text-primary text-sm py-1 px-3 rounded-full flex items-center shadow-sm">
                        <span className="material-icons text-sm mr-1">play_circle</span>
                        {translate("watchVideo")}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
