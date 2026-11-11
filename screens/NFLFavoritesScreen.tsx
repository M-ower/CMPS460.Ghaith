
import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'NFLFavorites'
>;

type Team = {
  id: string;
  name: string;
  city: string;
  conference: string;
};

const FAVORITES_KEY = '@nfl_favorite_teams';

const NFL_TEAMS: Team[] = [
  {id: '1', name: 'Steelers', city: 'Pittsburgh', conference: 'AFC'},
  {id: '2', name: 'Chiefs', city: 'Kansas City', conference: 'AFC'},
  {id: '3', name: 'Bills', city: 'Buffalo', conference: 'AFC'},
  {id: '4', name: 'Ravens', city: 'Baltimore', conference: 'AFC'},
  {id: '5', name: 'Bengals', city: 'Cincinnati', conference: 'AFC'},
  {id: '6', name: 'Eagles', city: 'Philadelphia', conference: 'NFC'},
  {id: '7', name: 'Cowboys', city: 'Dallas', conference: 'NFC'},
  {id: '8', name: '49ers', city: 'San Francisco', conference: 'NFC'},
  {id: '9', name: 'Packers', city: 'Green Bay', conference: 'NFC'},
  {id: '10', name: 'Lions', city: 'Detroit', conference: 'NFC'},
  {id: '11', name: 'Bears', city: 'Chicago', conference: 'NFC'},
  {id: '12', name: 'Patriots', city: 'New England', conference: 'AFC'},
];

function NFLFavoritesScreen({navigation}: Props) {
  const [favorites, setFavorites] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    try {
      const saved = await AsyncStorage.getItem(FAVORITES_KEY);
      const favoriteIds: string[] = saved ? JSON.parse(saved) : [];

      const savedTeams = NFL_TEAMS.filter(team =>
        favoriteIds.includes(team.id),
      );

      setFavorites(savedTeams);
    } catch (error) {
      console.error('Unable to load favorites:', error);
      Alert.alert('Error', 'Unable to load your favorite teams.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites]),
  );

  async function removeFavorite(teamId: string) {
    try {
      const saved = await AsyncStorage.getItem(FAVORITES_KEY);
      const favoriteIds: string[] = saved ? JSON.parse(saved) : [];

      const updatedIds = favoriteIds.filter(id => id !== teamId);

      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedIds),
      );

      setFavorites(current =>
        current.filter(team => team.id !== teamId),
      );
    } catch (error) {
      console.error('Unable to remove favorite:', error);
      Alert.alert('Error', 'Unable to remove this team.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Favorite Teams</Text>

      <Text style={styles.subtitle}>
        Your saved NFL teams are stored on your device.
      </Text>

      {loading ? (
        <Text style={styles.message}>Loading favorites...</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.message}>
              You haven't added any favorite teams yet.
            </Text>
          }
          renderItem={({item}) => (
            <View style={styles.teamCard}>
              <Pressable
                style={styles.teamInfo}
                onPress={() =>
                  navigation.navigate('NFLTeamDetails', {
                    teamId: item.id,
                  })
                }>
                <Text style={styles.teamName}>
                  {item.city} {item.name}
                </Text>

                <Text style={styles.conference}>
                  {item.conference} Conference
                </Text>

                <Text style={styles.viewDetails}>
                  Tap to view team details
                </Text>
              </Pressable>

              <Pressable
                style={styles.removeButton}
                onPress={() => removeFavorite(item.id)}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </Pressable>
            </View>
          )}
        />
      )}

      <Text style={styles.count}>
        Total favorite teams: {favorites.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    padding: 16,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#172554',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 15,
    flexGrow: 1,
  },
  teamCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamInfo: {
    flex: 1,
    marginRight: 10,
  },
  teamName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
  },
  conference: {
    fontSize: 13,
    color: '#666',
    marginTop: 5,
  },
  viewDetails: {
    fontSize: 12,
    color: '#2563eb',
    marginTop: 6,
  },
  removeButton: {
    backgroundColor: '#991b1b',
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 7,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    fontSize: 15,
    color: '#777',
    marginTop: 40,
  },
  count: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#172554',
    textAlign: 'center',
    padding: 12,
  },
});

export default NFLFavoritesScreen;
