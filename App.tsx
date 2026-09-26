import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';

// Reusable component that receives information through props
function EventInfo({ name, type }: { name: string; type: string }) {
  return (
    <View style={styles.eventBox}>
      <Text style={styles.eventName}>{name}</Text>
      <Text style={styles.eventType}>{type}</Text>
    </View>
  );
}

export default function App() {
  // State for the user's name
  const [name, setName] = useState('');

  // State for the number of guests
  const [guests, setGuests] = useState(1);

  // State for showing the registration result
  const [registered, setRegistered] = useState(false);

  // Increase the number of guests
  const addGuest = () => {
    setGuests(guests + 1);
  };

  // Decrease guests but do not go below 1
  const removeGuest = () => {
    if (guests > 1) {
      setGuests(guests - 1);
    }
  };

  // Register for the event
  const register = () => {
    if (name.trim() !== '') {
      setRegistered(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Registration</Text>

      <EventInfo
        name="Mobile Development Workshop"
        type="React Native Event"
      />

      <Text style={styles.label}>Name:</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Guests: {guests}</Text>

      <View style={styles.buttonSpace}>
        <Button title="- Guest" onPress={removeGuest} />
      </View>

      <View style={styles.buttonSpace}>
        <Button title="+ Guest" onPress={addGuest} />
      </View>

      <View style={styles.registerButton}>
        <Button title="Register" onPress={register} />
      </View>

      {/* Conditional rendering: only show this section after registration */}
      {registered && (
        <View style={styles.result}>
          <Text style={styles.success}>Registration Complete!</Text>

          <Text style={styles.resultText}>Name: {name}</Text>

          <Text style={styles.resultText}>
            Event: Mobile Development Workshop
          </Text>

          <Text style={styles.resultText}>Guests: {guests}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#f5f5f5',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },

  eventBox: {
    padding: 20,
    marginBottom: 25,
    backgroundColor: 'white',
    borderRadius: 10,
  },

  eventName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  eventType: {
    fontSize: 17,
  },

  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 17,
    marginBottom: 20,
  },

  buttonSpace: {
    marginBottom: 10,
  },

  registerButton: {
    marginTop: 10,
  },

  result: {
    marginTop: 25,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },

  success: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  resultText: {
    fontSize: 17,
    marginBottom: 8,
  },
}); 