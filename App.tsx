import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import CarsScreen from './screens/CarsScreen';
import CarDetailsScreen from './screens/CarDetailsScreen';
import AboutScreen from './screens/AboutScreen';
import GarageScreen from './screens/GarageScreen';
import type {RootStackParamList} from './navigation/types';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
