
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CameraView,
  useCameraPermissions,
} from 'expo-camera';
import * as Location from 'expo-location';
import { Directory, File, Paths } from 'expo-file-system';

const STORAGE_KEY = '@location_journal_entries';

type JournalEntry = {
  id: string;
  imageUri: string;
  latitude: number;
  longitude: number;
  note: string;
  createdAt: string;
};

export default function App() {
  const cameraRef = useRef<CameraView>(null);

  const [cameraPermission, requestCameraPermission] =
    useCameraPermissions();

  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const [note, setNote] = useState('');
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  const [loadingLocation, setLoadingLocation] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadingEntries, setLoadingEntries] = useState(true);

  // Load saved journal entries when the app opens.
  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const savedEntries = await AsyncStorage.getItem(STORAGE_KEY);

      if (savedEntries) {
        setEntries(JSON.parse(savedEntries) as JournalEntry[]);
      }
    } catch (error) {
      console.error('Error loading journal entries:', error);
      Alert.alert('Error', 'Could not load your saved journal entries.');
    } finally {
      setLoadingEntries(false);
    }
  };

  // Open the camera only after the user requests it.
  const openCamera = async () => {
    try {
      if (!cameraPermission?.granted) {
        const permission = await requestCameraPermission();

        if (!permission.granted) {
          Alert.alert(
            'Camera Permission Needed',
            'Please allow camera access to take journal photos.',
          );
          return;
        }
      }

      setPhotoUri(null);
      setCameraReady(false);
      setCameraOpen(true);
    } catch (error) {
      console.error('Camera permission error:', error);
      Alert.alert('Camera Error', 'Could not open the camera.');
    }
  };

  // Capture a photograph.
  const takePhoto = async () => {
    if (!cameraRef.current || !cameraReady) {
      Alert.alert('Please Wait', 'The camera is not ready yet.');
      return;
    }

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });

      if (photo?.uri) {
        setPhotoUri(photo.uri);
        setCameraOpen(false);
      }
    } catch (error) {
      console.error('Photo capture error:', error);
      Alert.alert('Camera Error', 'Could not capture the photo.');
    }
  };

  // Request foreground location when the user needs it.
  const getLocation = async () => {
    setLoadingLocation(true);

    try {
      const permission =
        await Location.requestForegroundPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Location Permission Needed',
          'Please allow location access while using the app to save coordinates with your journal entry.',
        );
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    } catch (error) {
      console.error('Location error:', error);
      Alert.alert(
        'Location Error',
        'Could not retrieve your current location. Check that location services are enabled.',
      );
    } finally {
      setLoadingLocation(false);
    }
  };

  // Save the photo permanently and store the journal information.
  const saveEntry = async () => {
    if (!photoUri) {
      Alert.alert('Photo Required', 'Please take a photo first.');
      return;
    }

    if (latitude === null || longitude === null) {
      Alert.alert(
        'Location Required',
        'Please get your current location before saving the entry.',
      );
      return;
    }

    setSaving(true);

    try {
      const id = Date.now().toString();
      const photosDirectory = new Directory(
        Paths.document,
        'journal-photos',
      );

      if (!photosDirectory.exists) {
        photosDirectory.create({ intermediates: true });
      }

      const fileName = `journal-${id}.jpg`;
      const sourceFile = new File(photoUri);
      const destinationFile = new File(
        photosDirectory,
        fileName,
      );

      await sourceFile.copy(destinationFile);

      const newEntry: JournalEntry = {
        id,
        imageUri: destinationFile.uri,
        latitude,
        longitude,
        note: note.trim(),
        createdAt: new Date().toISOString(),
      };

      const updatedEntries = [newEntry, ...entries];

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedEntries),
      );

      setEntries(updatedEntries);
      setPhotoUri(null);
      setLatitude(null);
      setLongitude(null);
      setNote('');

      Alert.alert('Success', 'Your journal entry was saved!');
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert(
        'Save Error',
        'Could not save your journal entry. Please try again.',
      );
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>My Location Journal</Text>
          <Text style={styles.subtitle}>
            Capture your memories and remember where they happened.
          </Text>
        </View>

        {/* Camera section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>My Photo</Text>

          {cameraOpen ? (
            <View>
              <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing="back"
                onCameraReady={() => setCameraReady(true)}
              />

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={takePhoto}
                disabled={!cameraReady}
              >
                <Text style={styles.buttonText}>
                  {cameraReady ? 'Take Photo' : 'Opening Camera...'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => setCameraOpen(false)}
              >
                <Text style={styles.secondaryButtonText}>
                  Cancel Camera
                </Text>
              </TouchableOpacity>
            </View>
          ) : photoUri ? (
            <View>
              <Image
                source={{ uri: photoUri }}
                style={styles.previewImage}
              />

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={openCamera}
              >
                <Text style={styles.secondaryButtonText}>
                  Retake Photo
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.photoPlaceholder}>
              <Text style={styles.placeholderText}>
                No photo captured yet
              </Text>
            </View>
          )}

          {!cameraOpen && (
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={openCamera}
            >
              <Text style={styles.buttonText}>
                {photoUri ? 'Change Photo' : 'Open Camera'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Location section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>My Location</Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={getLocation}
            disabled={loadingLocation}
          >
            {loadingLocation ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>
                Get Current Location
              </Text>
            )}
          </TouchableOpacity>

          {latitude !== null && longitude !== null ? (
            <View style={styles.locationBox}>
              <Text style={styles.locationText}>
                Latitude: {latitude.toFixed(6)}
              </Text>
              <Text style={styles.locationText}>
                Longitude: {longitude.toFixed(6)}
              </Text>
            </View>
          ) : (
            <Text style={styles.helperText}>
              Your coordinates will appear here after permission is granted.
            </Text>
          )}
        </View>

        {/* Journal note section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Journal Note</Text>

          <TextInput
            style={styles.noteInput}
            placeholder="Write about this place or memory..."
            placeholderTextColor="#888888"
            value={note}
            onChangeText={setNote}
            multiline
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={[
              styles.primaryButton,
              saving && styles.disabledButton,
            ]}
            onPress={saveEntry}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Save Journal Entry</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Saved journal entries */}
        <View style={styles.entriesSection}>
          <Text style={styles.sectionTitle}>
            Saved Journal Entries ({entries.length})
          </Text>

          {loadingEntries ? (
            <ActivityIndicator size="large" color="#2563EB" />
          ) : entries.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.placeholderText}>
                No journal entries yet. Capture your first memory!
              </Text>
            </View>
          ) : (
            entries.map((entry) => (
              <View key={entry.id} style={styles.entryCard}>
                <Image
                  source={{ uri: entry.imageUri }}
                  style={styles.entryImage}
                />

                <Text style={styles.entryDate}>
                  {formatDate(entry.createdAt)}
                </Text>

                <Text style={styles.entryNote}>
                  {entry.note || 'No note added.'}
                </Text>

                <Text style={styles.entryCoordinates}>
                  Latitude: {entry.latitude.toFixed(6)}
                </Text>

                <Text style={styles.entryCoordinates}>
                  Longitude: {entry.longitude.toFixed(6)}
                </Text>
              </View>
            ))
          )}
        </View>

        <Text style={styles.footer}>
          Your journal entries are stored on this device.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 40,
  },
  header: {
    marginTop: 25,
    marginBottom: 22,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#172554',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 7,
    lineHeight: 21,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 17,
    marginBottom: 17,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#172554',
    marginBottom: 14,
  },
  camera: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  previewImage: {
    width: '100%',
    height: 260,
    borderRadius: 12,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  photoPlaceholder: {
    height: 160,
    backgroundColor: '#E8EEF7',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  placeholderText: {
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 21,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  secondaryButton: {
    backgroundColor: '#E8EEF7',
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  secondaryButtonText: {
    color: '#1E40AF',
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.6,
  },
  locationBox: {
    backgroundColor: '#EFF6FF',
    padding: 13,
    borderRadius: 10,
    marginTop: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#1E40AF',
    marginVertical: 3,
  },
  helperText: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 12,
    lineHeight: 19,
  },
  noteInput: {
    minHeight: 110,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 13,
    fontSize: 15,
    color: '#172554',
    backgroundColor: '#FFFFFF',
  },
  entriesSection: {
    marginTop: 5,
  },
  emptyBox: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 12,
    alignItems: 'center',
  },
  entryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 15,
    elevation: 2,
  },
  entryImage: {
    width: '100%',
    height: 210,
    borderRadius: 10,
    marginBottom: 12,
  },
  entryDate: {
    color: '#64748B',
    fontSize: 12,
    marginBottom: 8,
  },
  entryNote: {
    fontSize: 16,
    fontWeight: '600',
    color: '#172554',
    marginBottom: 10,
  },
  entryCoordinates: {
    fontSize: 13,
    color: '#475569',
    marginTop: 3,
  },
  footer: {
    textAlign: 'center',
    color: '#64748B',
    fontSize: 12,
    marginTop: 12,
  },
});
