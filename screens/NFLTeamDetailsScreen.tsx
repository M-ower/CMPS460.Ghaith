
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'NFLTeamDetails'
>;

type Player = {
  name: string;
  position: string;
};

type TeamDetails = {
  id: string;
  name: string;
  city: string;
  conference: string;
  players: Player[];
};

const FAVORITES_KEY = '@nfl_favorite_teams';

const NFL_TEAM_DETAILS: TeamDetails[] = [
  {
    id: '1',
    name: 'Steelers',
    city: 'Pittsburgh',
    conference: 'AFC',
    players: [
      {name: 'T.J. Watt', position: 'Linebacker'},
      {name: 'Cameron Heyward', position: 'Defensive Tackle'},
    ],
  },
  {
    id: '2',
    name: 'Chiefs',
    city: 'Kansas City',
    conference: 'AFC',
    players: [
      {name: 'Patrick Mahomes', position: 'Quarterback'},
      {name: 'Travis Kelce', position: 'Tight End'},
    ],
  },
  {
    id: '3',
    name: 'Bills',
    city: 'Buffalo',
    conference: 'AFC',
    players: [
      {name: 'Josh Allen', position: 'Quarterback'},
      {name: 'James Cook', position: 'Running Back'},
    ],
  },
  {
    id: '4',
    name: 'Ravens',
    city: 'Baltimore',
    conference: 'AFC',
    players: [
      {name: 'Lamar Jackson', position: 'Quarterback'},
      {name: 'Derrick Henry', position: 'Running Back'},
    ],
  },
  {
    id: '5',
    name: 'Bengals',
    city: 'Cincinnati',
    conference: 'AFC',
    players: [
      {name: 'Joe Burrow', position: 'Quarterback'},
      {name: "Ja'Marr Chase", position: 'Wide Receiver'},
    ],
  },
  {
    id: '6',
    name: 'Eagles',
    city: 'Philadelphia',
    conference: 'NFC',
    players: [
      {name: 'Jalen Hurts', position: 'Quarterback'},
      {name: 'Saquon Barkley', position: 'Running Back'},
    ],
  },
  {
    id: '7',
    name: 'Cowboys',
    city: 'Dallas',
    conference: 'NFC',
    players: [
      {name: 'Dak Prescott', position: 'Quarterback'},
      {name: 'CeeDee Lamb', position: 'Wide Receiver'},
    ],
  },
  {
    id: '8',
    name: '49ers',
    city: 'San Francisco',
    conference: 'NFC',
    players: [
      {name: 'Brock Purdy', position: 'Quarterback'},
      {name: 'Christian McCaffrey', position: 'Running Back'},
    ],
  },
  {
    id: '9',
    name: 'Packers',
    city: 'Green Bay',
    conference: 'NFC',
    players: [
      {name: 'Jordan Love', position: 'Quarterback'},
      {name: 'Josh Jacobs', position: 'Running Back'},
    ],
  },
  {
    id: '10',
    name: 'Lions',
    city: 'Detroit',
    conference: 'NFC',
    players: [
      {name: 'Jared Goff', position: 'Quarterback'},
      {name: 'Amon-Ra St. Brown', position: 'Wide Receiver'},
    ],
  },
  {
    id: '11',
    name: 'Bears',
    city: 'Chicago',
    conference: 'NFC',
    players: [
      {name: 'Caleb Williams', position: 'Quarterback'},
      {name: 'DJ Moore', position: 'Wide Receiver'},
    ],
  },
  {
    id: '12',
    name: 'Patriots',
    city: 'New England',
    conference: 'AFC',
    players: [
      {name: 'Drake Maye', position: 'Quarterback'},
      {name: 'Rhamondre Stevenson', position: 'Running Back'},
    ],
  },
];

function NFLTeamDetailsScreen({route}: Props) {
  const {teamId} = route.params;

  const team = NFL_TEAM_DETAILS.find(item => item.id === teamId);

  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadFavorite() {
      try {
        const saved = await AsyncStorage.getItem(FAVORITES_KEY);
        const favorites: string[] = saved ? JSON.parse(saved) : [];

        if (active) {
          setIsFavorite(favorites.includes(teamId));
        }
      } catch (error) {
        console.error('Unable to load favorite teams:', error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadFavorite();

    return () => {
      active = false;
    };
  }, [teamId]);

  async function toggleFavorite() {
    try {
      const saved = await AsyncStorage.getItem(FAVORITES_KEY);
      const favorites: string[] = saved ? JSON.parse(saved) : [];

      let updatedFavorites: string[];

      if (favorites.includes(teamId)) {
        updatedFavorites = favorites.filter(id => id !== teamId);
      } else {
        updatedFavorites = [...favorites, teamId];
      }

      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites),
      );

      setIsFavorite(updatedFavorites.includes(teamId));

      Alert.alert(
        'Favorites Updated',
        updatedFavorites.includes(teamId)
          ? 'Team added to your favorites.'
          : 'Team removed from your favorites.',
      );
    } catch (error) {
      Alert.alert('Error', 'Unable to update your favorite teams.');
      console.error('Unable to save favorites:', error);
    }
  }

  if (!team) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Team Not Found</Text>
        <Text style={styles.description}>
          The selected team could not be found.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {team.city} {team.name}
        </Text>

        <Text style={styles.conference}>
          {team.conference} Conference
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Team Players</Text>

      {team.players.map((player, index) => (
        <View key={player.name} style={styles.playerCard}>
          <Text style={styles.playerNumber}>
            Player {index + 1}
          </Text>

          <Text style={styles.playerName}>{player.name}</Text>

          <Text style={styles.position}>{player.position}</Text>
        </View>
      ))}

      <Pressable
        style={[
          styles.favoriteButton,
          isFavorite && styles.removeButton,
        ]}
        onPress={toggleFavorite}
        disabled={loading}>
        <Text style={styles.favoriteButtonText}>
          {loading
            ? 'Loading...'
            : isFavorite
              ? 'Remove from Favorites'
              : 'Add to Favorites'}
        </Text>
      </Pressable>

      <Text style={styles.description}>
        Your favorite teams are saved locally on your device.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    padding: 18,
  },
  header: {
    backgroundColor: '#172554',
    padding: 25,
    borderRadius: 12,
    marginBottom: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  conference: {
    fontSize: 16,
    color: '#dbeafe',
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#172554',
    marginBottom: 14,
  },
  playerCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#172554',
  },
  playerNumber: {
    fontSize: 12,
    color: '#777',
    marginBottom: 5,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  position: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  favoriteButton: {
    backgroundColor: '#172554',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  removeButton: {
    backgroundColor: '#991b1b',
  },
  favoriteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 25,
  },
});

export default NFLTeamDetailsScreen;
