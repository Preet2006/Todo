import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  weather?: WeatherData | null;
  city?: string | null;
}

interface TasksState {
  tasks: Task[];
}

const loadTasks = (): Task[] => {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : [];
};

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const initialState: TasksState = {
  tasks: loadTasks(),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      const newTask = {
        ...action.payload,
        id: uuidv4(),
      };
      state.tasks.push(newTask);
      saveTasks(state.tasks);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasks(state.tasks);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasks(state.tasks);
      }
    },
    updateTaskPriority: (state, action: PayloadAction<{ id: string; priority: 'low' | 'medium' | 'high' }>) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.priority = action.payload.priority;
        saveTasks(state.tasks);
      }
    },
  },
});

export const { addTask, removeTask, toggleTask, updateTaskPriority } = tasksSlice.actions;
export default tasksSlice.reducer;