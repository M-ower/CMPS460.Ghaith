import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {OrganizerTask} from './Task';

const STORAGE_KEY = 'module8OrganizerTasks';

interface TaskContextValue {
  tasks: OrganizerTask[];
  isLoaded: boolean;
  addTask: (title: string, description: string) => void;
  updateTask: (task: OrganizerTask) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export const TaskProvider = ({children}: {children: React.ReactNode}) => {
  const [tasks, setTasks] = useState<OrganizerTask[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedTasks) {
          const parsed: unknown = JSON.parse(savedTasks);

          if (Array.isArray(parsed)) {
            setTasks(parsed as OrganizerTask[]);
          }
        }
      } catch (error) {
        console.error('Error loading Module 8 tasks:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving Module 8 tasks:', error);
      }
    };

    saveTasks();
  }, [tasks, isLoaded]);

  const addTask = useCallback((title: string, description: string) => {
    const newTask: OrganizerTask = {
      id: `${Date.now()}-${Math.random()}`,
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks(current => [...current, newTask]);
  }, []);

  const updateTask = useCallback((updatedTask: OrganizerTask) => {
    setTasks(current =>
      current.map(task =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks(current =>
      current.map(task =>
        task.id === id ? {...task, completed: !task.completed} : task,
      ),
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(current => current.filter(task => task.id !== id));
  }, []);

  return (
    <TaskContext.Provider
      value={{tasks, isLoaded, addTask, updateTask, toggleTask, deleteTask}}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTasks must be used inside TaskProvider');
  }

  return context;
};
