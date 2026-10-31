import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CarCareOrganizerScreen from './screens/CarCareOrganizerScreen';
import HomeScreen from './screens/HomeScreen';
import CarsScreen from './screens/CarsScreen';
import CarDetailsScreen from './screens/CarDetailsScreen';
import AboutScreen from './screens/AboutScreen';
import GarageScreen from './screens/GarageScreen';
import ApiPostsScreen from './screens/ApiPostsScreen';
import type {RootStackParamList} from './navigation/types';
import TaskManagerScreen from './screens/TaskManagerScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Car Collection'}}
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
  );
}

export default App;
