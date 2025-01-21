import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeTask, toggleTask, updateTaskPriority, type Task } from '../store/tasksSlice';
import { RootState } from '../store/store';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Star, CloudSun, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleDelete = (task: Task) => {
    dispatch(removeTask(task.id));
    toast({
      title: "Task deleted",
      description: task.title,
    });
  };

  const handleToggle = (task: Task) => {
    dispatch(toggleTask(task.id));
    toast({
      title: task.completed ? "Task uncompleted" : "Task completed",
      description: task.title,
    });
  };

  const handlePriorityChange = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const newPriority = task.priority === 'high' ? 'low' : 'high';
      dispatch(updateTaskPriority({ id: taskId, priority: newPriority }));
    }
  };

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const renderTask = (task: Task) => (
    <div
      key={task.id}
      className="group transition-all duration-200 hover:bg-purple-50 dark:hover:bg-gray-700/50 rounded-lg"
    >
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => handleToggle(task)}
            className="border-2"
          />
          <span className={`flex-1 ${task.completed ? "line-through text-gray-500 dark:text-gray-400" : ""}`}>
            {task.title}
          </span>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePriorityChange(task.id)}
              className={`${task.priority === 'high' ? 'text-yellow-500' : 'text-gray-400'} hover:bg-purple-100 dark:hover:bg-gray-600`}
            >
              <Star className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(task)}
              className="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {task.weather && (
          <div className="ml-10 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <CloudSun className="w-4 h-4" />
            <span>{task.city}: {task.weather.temperature}°C - {task.weather.description}</span>
            <img 
              src={`https://openweathermap.org/img/wn/${task.weather.icon}.png`} 
              alt="weather" 
              className="w-6 h-6"
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Incomplete Tasks */}
      <div className="space-y-1">
        {incompleteTasks.map(renderTask)}
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="space-y-1 border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Completed</h3>
          {completedTasks.map(renderTask)}
        </div>
      )}
    </div>
  );
};