import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import type {OrganizerTask} from '../data/Task';

interface TaskCardProps {
  task: OrganizerTask;
  onPress: () => void;
  onToggle: () => void;
}

const TaskCard = ({task, onPress, onToggle}: TaskCardProps) => {
  return (
    <View style={styles.card}>
      <Pressable
        style={styles.taskInfo}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`View details for ${task.title}`}
        accessibilityHint="Opens the task details screen">
        <Text style={[styles.title, task.completed && styles.completed]}>
          {task.title}
        </Text>
        <Text style={styles.status}>
          {task.completed ? 'Completed' : 'Not completed'}
        </Text>
        <Text style={styles.detailsLink}>View details</Text>
      </Pressable>

      <Pressable
        style={[
          styles.toggleButton,
          task.completed && styles.undoButton,
        ]}
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityLabel={
          task.completed
            ? `Mark ${task.title} as not completed`
            : `Mark ${task.title} as completed`
        }>
        <Text style={styles.buttonText}>
          {task.completed ? 'Undo' : 'Complete'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  taskInfo: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#777',
  },
  status: {
    color: '#555',
    marginTop: 5,
  },
  detailsLink: {
    color: '#245c9c',
    marginTop: 6,
    fontWeight: '600',
  },
  toggleButton: {
    backgroundColor: '#287a45',
    paddingVertical: 11,
    paddingHorizontal: 13,
    borderRadius: 7,
  },
  undoButton: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TaskCard;
