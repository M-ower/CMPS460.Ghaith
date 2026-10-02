import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Cars'>;

const cars = [
  {
    name: 'Toyota Supra',
    year: 2024,
    price: '$45,540',
    description:
      'The Toyota Supra is a sporty car known for its performance and modern design.',
  },
  {
    name: 'Ford Mustang',
    year: 2024,
    price: '$31,920',
    description:
      'The Ford Mustang is an American sports car with a powerful engine and classic style.',
  },
  {
    name: 'Chevrolet Corvette',
    year: 2024,
    price: '$68,300',
    description:
      'The Chevrolet Corvette is a high-performance sports car with a strong V8 engine.',
  },
  {
    name: 'BMW M4',
    year: 2024,
    price: '$80,100',
    description:
      'The BMW M4 combines sporty performance with a comfortable interior and modern technology.',
  },
  {
    name: 'Nissan GT-R',
    year: 2024,
    price: '$120,990',
    description:
      'The Nissan GT-R is a performance-focused sports car known for its speed and all-wheel drive.',
  },
];

function CarsScreen({navigation}: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>My Car Collection</Text>

      {cars.map(car => (
        <View key={car.name} style={styles.card}>
          <Text style={styles.carName}>{car.name}</Text>

          <Text style={styles.info}>Year: {car.year}</Text>

          <Text style={styles.info}>Price: {car.price}</Text>

          <Pressable
            style={styles.button}
            onPress={() =>
              navigation.navigate('CarDetails', {
                name: car.name,
                year: car.year,
                price: car.price,
                description: car.description,
              })
            }>
            <Text style={styles.buttonText}>View Details</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  card: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  carName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  info: {
    fontSize: 17,
    marginBottom: 5,
  },

  button: {
    marginTop: 15,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#333',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CarsScreen;