import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'CarDetails'>;

function CarDetailsScreen({route}: Props) {
  const {name, year, price, description} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Year</Text>
        <Text style={styles.value}>{year}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Price</Text>
        <Text style={styles.value}>{price}</Text>
      </View>

      <View style={styles.descriptionBox}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },

  infoBox: {
    padding: 18,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  value: {
    fontSize: 20,
  },

  descriptionBox: {
    padding: 18,
    marginTop: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  description: {
    fontSize: 17,
    lineHeight: 25,
  },
});

export default CarDetailsScreen;