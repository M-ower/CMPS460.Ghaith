
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'NFLTeams'>;

type NFLTeam = {
  id: string;
  name: string;
  city: string;
  conference: string;
};

const NFL_TEAMS: NFLTeam[] = [
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

function NFLTeamsScreen({navigation}: Props) {
  const [search, setSearch] = useState('');

  const filteredTeams = NFL_TEAMS.filter(team =>
    `${team.name} ${team.city} ${team.conference}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NFL Teams</Text>

      <Text style={styles.subtitle}>
        Explore teams from the National Football League.
      </Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search teams..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.resultCount}>
        {filteredTeams.length} teams found
      </Text>

      <FlatList
        data={filteredTeams}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No teams found.</Text>
        }
        renderItem={({item}) => (
          <Pressable
            style={styles.teamCard}
            onPress={() =>
              navigation.navigate('NFLTeamDetails', {
                teamId: item.id,
              })
            }>
            <View style={styles.teamInfo}>
              <Text style={styles.teamName}>
                {item.city} {item.name}
              </Text>
              <Text style={styles.conference}>
                {item.conference} Conference
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>
        )}
      />

      <Pressable
        style={styles.favoritesButton}
        onPress={() => navigation.navigate('NFLFavorites')}>
        <Text style={styles.favoritesButtonText}>
          View Favorite Teams
        </Text>
      </Pressable>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#172554',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    marginBottom: 18,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 13,
    fontSize: 16,
    color: '#222',
  },
  resultCount: {
    fontSize: 13,
    color: '#666',
    marginTop: 14,
    marginBottom: 8,
  },
  list: {
    paddingBottom: 12,
  },
  teamCard: {
    backgroundColor: '#fff',
    padding: 17,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    borderLeftColor: '#172554',
  },
  teamInfo: {
    flex: 1,
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
  arrow: {
    fontSize: 28,
    color: '#172554',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#777',
  },
  favoritesButton: {
    backgroundColor: '#172554',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 8,
  },
  favoritesButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default NFLTeamsScreen;
