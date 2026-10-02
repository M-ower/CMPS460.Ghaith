import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This App</Text>

      <Text style={styles.name}>Ghaith AlDarwash</Text>

      <Text style={styles.appName}>Car Collection</Text>

      <Text style={styles.description}>
        This application was created to display a collection of cars and
        provide information about each car. Users can view the cars and select
        a car to see more details.
      </Text>

      <Text style={styles.course}>
        Mobile Programming{'\n'}
        React Native & TypeScript
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  appName: {
    fontSize: 20,
    marginBottom: 20,
  },

  description: {
    fontSize: 17,
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 25,
  },

  course: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AboutScreen;