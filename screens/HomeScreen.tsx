
import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car Collection</Text>

      <Text style={styles.subtitle}>
        Welcome to my car collection app.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Cars')}>
        <Text style={styles.buttonText}>View Cars</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Garage')}>
        <Text style={styles.buttonText}>My Garage</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('ApiPosts')}>
        <Text style={styles.buttonText}>API Data Viewer</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('About')}>
        <Text style={styles.buttonText}>About</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },

  button: {
    width: '80%',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    backgroundColor: '#333',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
