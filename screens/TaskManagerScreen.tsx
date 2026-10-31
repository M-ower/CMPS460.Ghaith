
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const STORAGE_KEY = 'module7Tasks';

const TaskManagerScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved tasks when the screen opens.
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedTasks) {
          const parsedTasks: unknown = JSON.parse(savedTasks);

          if (Array.isArray(parsedTasks)) {
            setTasks(parsedTasks as Task[]);
          } else {
            Alert.alert('Storage Error', 'Saved task data is invalid.');
          }
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
        Alert.alert('Error', 'Could not load your saved tasks.');
      } finally {
        setIsLoaded(true);
      }
    };

    loadTasks();
  }, []);

  // Save tasks whenever the list changes, after loading finishes.
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving tasks:', error);
        Alert.alert('Storage Error', 'Your tasks could not be saved.');
      }
    };

    saveTasks();
  }, [tasks, isLoaded]);

  const addTask = () => {
    if (!taskTitle.trim()) {
      Alert.alert('Missing Information', 'Please enter a task.');
      return;
    }

    const newTask: Task = {
      id: `${Date.now()}-${Math.random()}`,
      title: taskTitle.trim(),
      completed: false,
    };

    setTasks(currentTasks => [...currentTasks, newTask]);
    setTaskTitle('');
  };

  const toggleTask = (id: string) => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === id
          ? {...task, completed: !task.completed}
          : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setTasks(currentTasks =>
            currentTasks.filter(task => task.id !== id),
          );
        },
      },
    ]);
  };

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Loading saved tasks...</Text>
      </View>
    );
  }

  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Persistent Task Manager</Text>

      <Text style={styles.subtitle}>
        Add tasks, track your progress, and keep your tasks saved.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a new task"
        value={taskTitle}
        onChangeText={setTaskTitle}
        onSubmitEditing={addTask}
        returnKeyType="done"
      />

      <Pressable style={styles.addButton} onPress={addTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </Pressable>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total Tasks: {tasks.length}</Text>
        <Text style={styles.summaryText}>
          Completed: {completedCount}
        </Text>
        <Text style={styles.summaryText}>
          Remaining: {tasks.length - completedCount}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>My Tasks</Text>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.taskCard}>
            <View style={styles.taskInfo}>
              <Text
                style={[
                  styles.taskTitle,
                  item.completed && styles.completedTask,
                ]}>
                {item.title}
              </Text>

              <Text style={styles.status}>
                {item.completed ? 'Completed' : 'Not Completed'}
              </Text>
            </View>

            <View style={styles.actions}>
              <Pressable
                style={styles.completeButton}
                onPress={() => toggleTask(item.id)}>
                <Text style={styles.buttonText}>
                  {item.completed ? 'Undo' : 'Complete'}
                </Text>
              </Pressable>

              <Pressable
                style={styles.deleteButton}
                onPress={() => deleteTask(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tasks yet. Add your first task above!
          </Text>
        }
      />
    </View>
  );
};

export default TaskManagerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
    marginBottom: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#333',
    padding: 13,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  summary: {
    marginTop: 15,
    marginBottom: 10,
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  summaryText: {
    fontSize: 14,
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  taskCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  taskInfo: {
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#777',
  },
  status: {
    color: '#666',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  completeButton: {
    backgroundColor: '#287a45',
    padding: 10,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: '#9b3030',
    padding: 10,
    borderRadius: 6,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});
