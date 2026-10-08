import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SavedCar } from '../data/SavedCar';

const STORAGE_KEY = 'savedCars';

const GarageScreen = () => {
  const [cars, setCars] = useState<SavedCar[]>([]);
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const savedCars = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedCars) {
          setCars(JSON.parse(savedCars));
        }
      } catch (error) {
        console.log('Error loading cars:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadCars();
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const saveCars = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
      } catch (error) {
        console.log('Error saving cars:', error);
      }
    };

    saveCars();
  }, [cars, isLoaded]);

  const addCar = () => {
    if (!name.trim() || !year.trim() || !price.trim()) {
      Alert.alert('Missing Information', 'Please enter the car name, year, and price.');
      return;
    }

    const newCar: SavedCar = {
      id: Date.now().toString(),
      name: name.trim(),
      year: year.trim(),
      price: price.trim(),
      description: description.trim(),
    };

    setCars(currentCars => [...currentCars, newCar]);

    setName('');
    setYear('');
    setPrice('');
    setDescription('');
  };

  const deleteCar = (id: string) => {
    setCars(currentCars => currentCars.filter(car => car.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Garage</Text>

      <TextInput
        style={styles.input}
        placeholder="Car Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Year"
        value={year}
        onChangeText={setYear}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <Pressable style={styles.addButton} onPress={addCar}>
        <Text style={styles.buttonText}>Add Car</Text>
      </Pressable>

      <FlatList
        data={cars}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.carCard}>
            <Text style={styles.carName}>{item.name}</Text>
            <Text>Year: {item.year}</Text>
            <Text>Price: {item.price}</Text>

            {item.description ? (
              <Text>Description: {item.description}</Text>
            ) : null}

            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteCar(item.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No cars have been added. Add your first car!
          </Text>
        }
      />
    </View>
  );
};

export default GarageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  deleteButton: {
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  carCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  carName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  },
});