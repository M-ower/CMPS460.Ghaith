import React, {useState} from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/types';
import {useTasks} from '../data/TaskContext';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetails'>;

const TaskDetailsScreen = ({route, navigation}: Props) => {
  const {taskId} = route.params;
  const {tasks, updateTask, toggleTask, deleteTask} = useTasks();
  const task = tasks.find(item => item.id === taskId);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(
    task?.description ?? '',
  );
  const [error, setError] = useState('');

  if (!task) {
    return (
      <View style={styles.center}>
        <Text style={styles.heading}>Task Not Found</Text>
        <Text style={styles.body}>
          This task may have been deleted.
        </Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Return to tasks">
          <Text style={styles.buttonText}>Back to Tasks</Text>
        </Pressable>
      </View>
    );
  }

  const saveChanges = () => {
    if (!title.trim()) {
      setError('Task title cannot be blank.');
      return;
    }

    updateTask({
      ...task,
      title: title.trim(),
      description: description.trim(),
    });

    setError('');
    setIsEditing(false);
    Alert.alert('Changes Saved', 'Your task has been updated.');
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to permanently delete this task?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteTask(task.id);
            navigation.goBack();
          },
        },
      ],
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Task Details</Text>

      {isEditing ? (
        <>
          <Text style={styles.label}>Task Title *</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={value => {
              setTitle(value);
              setError('');
            }}
            accessibilityLabel="Edit task title"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
            accessibilityLabel="Edit task description"
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable
            style={styles.button}
            onPress={saveChanges}
            accessibilityRole="button"
            accessibilityLabel="Save task changes">
            <Text style={styles.buttonText}>Save Changes</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => {
              setTitle(task.title);
              setDescription(task.description);
              setError('');
              setIsEditing(false);
            }}
            accessibilityRole="button"
            accessibilityLabel="Cancel editing">
            <Text style={styles.secondaryButtonText}>Cancel</Text>
          </Pressable>
        </>
      ) : (
        <>
          <View style={styles.detailCard}>
            <Text style={styles.label}>Title</Text>
            <Text style={styles.taskTitle}>{task.title}</Text>

            <Text style={styles.label}>Description</Text>
            <Text style={styles.body}>
              {task.description || 'No description provided.'}
            </Text>

            <Text style={styles.label}>Status</Text>
            <Text style={styles.body}>
              {task.completed ? 'Completed' : 'Not completed'}
            </Text>

            <Text style={styles.label}>Created</Text>
            <Text style={styles.body}>
              {new Date(task.createdAt).toLocaleString()}
            </Text>
          </View>

          <Pressable
            style={styles.button}
            onPress={() => setIsEditing(true)}
            accessibilityRole="button"
            accessibilityLabel="Edit task">
            <Text style={styles.buttonText}>Edit Task</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => toggleTask(task.id)}
            accessibilityRole="button"
            accessibilityLabel={
              task.completed
                ? 'Mark task as not completed'
                : 'Mark task as completed'
            }>
            <Text style={styles.secondaryButtonText}>
              {task.completed ? 'Mark as Not Completed' : 'Mark as Completed'}
            </Text>
          </Pressable>

          <Pressable
            style={styles.deleteButton}
            onPress={confirmDelete}
            accessibilityRole="button"
            accessibilityLabel="Delete task">
            <Text style={styles.buttonText}>Delete Task</Text>
          </Pressable>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },
  detailCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 12,
    marginBottom: 6,
  },
  taskTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#222',
  },
  body: {
    fontSize: 16,
    color: '#333',
    lineHeight: 23,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  descriptionInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  error: {
    color: '#b00020',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#e2e2e2',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#9b3030',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
});

export default TaskDetailsScreen;
