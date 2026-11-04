import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import type {
  MainTabParamList,
  RootStackParamList,
} from './navigation/types';

import {TaskProvider} from './data/TaskContext';

import HomeScreen from './screens/HomeScreen';
import TasksScreen from './screens/TasksScreen';
import SettingsScreen from './screens/SettingsScreen';
import TaskDetailsScreen from './screens/TaskDetailsScreen';

import CarsScreen from './screens/CarsScreen';
import CarDetailsScreen from './screens/CarDetailsScreen';
import AboutScreen from './screens/AboutScreen';
import GarageScreen from './screens/GarageScreen';
import CarCareOrganizerScreen from './screens/CarCareOrganizerScreen';
import ApiPostsScreen from './screens/ApiPostsScreen';
import TaskManagerScreen from './screens/TaskManagerScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Home'}}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{title: 'Tasks'}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{title: 'Settings'}}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainTabs">
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="TaskDetails"
            component={TaskDetailsScreen}
            options={{title: 'Task Details'}}
          />

          <Stack.Screen
            name="Cars"
            component={CarsScreen}
            options={{title: 'My Cars'}}
          />

          <Stack.Screen
            name="CarDetails"
            component={CarDetailsScreen}
            options={{title: 'Car Details'}}
          />

          <Stack.Screen
            name="About"
            component={AboutScreen}
            options={{title: 'About'}}
          />

          <Stack.Screen
            name="Garage"
            component={GarageScreen}
            options={{title: 'My Garage'}}
          />

          <Stack.Screen
            name="CarCareOrganizer"
            component={CarCareOrganizerScreen}
            options={{title: 'Car Care Organizer'}}
          />

          <Stack.Screen
            name="ApiPosts"
            component={ApiPostsScreen}
            options={{title: 'API Data Viewer'}}
          />

          <Stack.Screen
            name="TaskManager"
            component={TaskManagerScreen}
            options={{title: 'Persistent Task Manager'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
}

export default App;
