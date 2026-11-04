import React, {useState} from 'react';
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
import type {CompositeScreenProps} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {
  MainTabParamList,
  RootStackParamList,
} from '../navigation/types';
import {useTasks} from '../data/TaskContext';
import TaskCard from '../components/TaskCard';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Tasks'>,
  NativeStackScreenProps<RootStackParamList>
>;

const TasksScreen = ({navigation}: Props) => {
  const {tasks, isLoaded, addTask, toggleTask} = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleAddTask = () => {
    if (!title.trim()) {
      setError('Please enter a task title.');
      return;
    }

    addTask(title, description);
    setTitle('');
    setDescription('');
    setError('');
    Alert.alert('Task Added', 'Your task has been added.');
  };

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" accessibilityLabel="Loading tasks" />
        <Text style={styles.loadingText}>Loading your tasks...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Tasks</Text>
      <Text style={styles.subtitle}>
        Add tasks and keep track of what you need to do.
      </Text>

      <Text style={styles.label}>Task Title *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a task title"
        value={title}
        onChangeText={value => {
          setTitle(value);
          if (error) {
            setError('');
          }
        }}
        accessibilityLabel="Task title"
        returnKeyType="next"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Enter a description (optional)"
        value={description}
        onChangeText={setDescription}
        accessibilityLabel="Task description"
        multiline
        textAlignVertical="top"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable
        style={styles.addButton}
        onPress={handleAddTask}
        accessibilityRole="button"
        accessibilityLabel="Add task">
        <Text style={styles.addButtonText}>Add Task</Text>
      </Pressable>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total: {tasks.length}</Text>
        <Text style={styles.summaryText}>
          Completed: {tasks.filter(task => task.completed).length}
        </Text>
        <Text style={styles.summaryText}>
          Remaining: {tasks.filter(task => !task.completed).length}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Task List</Text>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TaskCard
            task={item}
            onPress={() =>
              navigation.navigate('TaskDetails', {taskId: item.id})
            }
            onToggle={() => toggleTask(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tasks yet. Add your first task above!
          </Text>
        }
        contentContainerStyle={
          tasks.length === 0 ? styles.emptyList : styles.listContent
        }
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    marginTop: 5,
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    color: '#222',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
    fontSize: 16,
  },
  descriptionInput: {
    minHeight: 75,
  },
  error: {
    color: '#b00020',
    marginBottom: 10,
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e8e8e8',
    borderRadius: 8,
    padding: 12,
    marginTop: 15,
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontSize: 15,
  },
});

export default TasksScreen;
