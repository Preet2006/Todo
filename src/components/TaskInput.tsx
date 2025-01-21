import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/tasksSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Bell, RotateCcw, Calendar, CloudSun } from 'lucide-react';
import { getWeatherData, type WeatherData } from '../utils/weatherService';

export const TaskInput = () => {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [isOutdoorTask, setIsOutdoorTask] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleWeatherCheck = async () => {
    if (!city) {
      toast({
        title: "Error",
        description: "Please enter a city name",
        variant: "destructive",
      });
      return;
    }

    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
      toast({
        title: "Weather updated",
        description: `${data.temperature}°C - ${data.description}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch weather data",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTask({ 
        title, 
        priority: 'medium', 
        completed: false,
        weather: isOutdoorTask ? weatherData : null,
        city: isOutdoorTask ? city : null,
      }));
      setTitle('');
      setCity('');
      setWeatherData(null);
      setIsOutdoorTask(false);
      toast({
        title: "Task added",
        description: title,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="space-y-4">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="border-0 px-0 text-lg placeholder:text-muted-foreground focus-visible:ring-0 bg-transparent"
        />
        {isOutdoorTask && (
          <div className="flex gap-2">
            <Input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city for weather"
              className="flex-1 bg-transparent"
            />
            <Button 
              type="button" 
              variant="outline"
              onClick={handleWeatherCheck}
              className="hover:bg-purple-50 dark:hover:bg-gray-700"
            >
              Check Weather
            </Button>
          </div>
        )}
        {weatherData && (
          <div className="bg-purple-50 dark:bg-gray-700/50 p-4 rounded-lg flex items-center gap-3">
            <img 
              src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`} 
              alt="weather" 
              className="w-10 h-10"
            />
            <span className="text-gray-700 dark:text-gray-300">{weatherData.temperature}°C - {weatherData.description}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Button 
            type="button" 
            size="sm" 
            variant={isOutdoorTask ? "default" : "ghost"}
            onClick={() => setIsOutdoorTask(!isOutdoorTask)}
            className={isOutdoorTask ? "bg-purple-500 hover:bg-purple-600" : "hover:bg-purple-50 dark:hover:bg-gray-700"}
          >
            <CloudSun className="w-4 h-4" />
          </Button>
          <Button 
            type="button" 
            size="sm" 
            variant="ghost"
            className="hover:bg-purple-50 dark:hover:bg-gray-700"
          >
            <Bell className="w-4 h-4" />
          </Button>
          <Button 
            type="button" 
            size="sm" 
            variant="ghost"
            className="hover:bg-purple-50 dark:hover:bg-gray-700"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button 
            type="button" 
            size="sm" 
            variant="ghost"
            className="hover:bg-purple-50 dark:hover:bg-gray-700"
          >
            <Calendar className="w-4 h-4" />
          </Button>
          <div className="ml-auto">
            <Button 
              type="submit" 
              size="sm"
              className="bg-purple-500 hover:bg-purple-600"
            >
              ADD TASK
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};