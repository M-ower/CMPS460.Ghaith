import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {MainTabParamList} from '../navigation/types';
import {useTasks} from '../data/TaskContext';

type Props = BottomTabScreenProps<MainTabParamList, 'Settings'>;

const SettingsScreen = (_props: Props) => {
  const {tasks, isLoaded} = useTasks();
  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <Text style={styles.subtitle}>
        Personal Organizer information and task progress.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Task Summary</Text>
        <Text style={styles.info}>Total tasks: {tasks.length}</Text>
        <Text style={styles.info}>Completed: {completedCount}</Text>
        <Text style={styles.info}>
          Remaining: {tasks.length - completedCount}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Storage</Text>
        <Text style={styles.info}>
          Your Module 8 tasks are saved locally on this device using
          AsyncStorage.
        </Text>
        <Text style={styles.info}>
          {isLoaded
            ? 'Task data has finished loading.'
            : 'Task data is loading.'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>About This App</Text>
        <Text style={styles.info}>
          Personal Organizer helps you create tasks, view details, update
          progress, and keep your information saved between app sessions.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    marginTop: 6,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 16,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
  },
  info: {
    fontSize: 15,
    color: '#444',
    lineHeight: 23,
    marginBottom: 5,
  },
});

export default SettingsScreen;
