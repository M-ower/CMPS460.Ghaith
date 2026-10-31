import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  OrganizerCategory,
  OrganizerItem,
} from '../data/OrganizerItem';

const STORAGE_KEY = 'carCareOrganizerItems';

const categories: Array<'All' | OrganizerCategory> = [
  'All',
  'Maintenance',
  'Expenses',
  'Reminders',
];

const CarCareOrganizerScreen = () => {
  const [items, setItems] = useState<OrganizerItem[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] =
    useState<OrganizerCategory>('Maintenance');
  const [date, setDate] = useState('');
  const [filter, setFilter] =
    useState<'All' | OrganizerCategory>('All');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem(STORAGE_KEY);

        if (storedItems) {
          const parsedItems: unknown = JSON.parse(storedItems);

          if (Array.isArray(parsedItems)) {
            setItems(parsedItems as OrganizerItem[]);
          } else {
            Alert.alert('Storage Error', 'Saved organizer data is invalid.');
          }
        }
      } catch (error) {
        console.error('Error loading organizer items:', error);
        Alert.alert('Error', 'Could not load your saved car-care records.');
      } finally {
        setIsLoaded(true);
      }
    };

    loadItems();
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const saveItems = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error('Error saving organizer items:', error);
        Alert.alert('Storage Error', 'Your changes could not be saved.');
      }
    };

    saveItems();
  }, [items, isLoaded]);

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setCategory('Maintenance');
    setDate('');
    setEditingId(null);
  };

  const isValidDate = (value: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return false;
    }

    const parsedDate = new Date(`${value}T00:00:00`);

    return (
      !Number.isNaN(parsedDate.getTime()) &&
      parsedDate.toISOString().slice(0, 10) === value
    );
  };

  const saveItem = () => {
    if (!title.trim()) {
      Alert.alert('Missing Information', 'Please enter a title.');
      return;
    }

    if (!isValidDate(date.trim())) {
      Alert.alert(
        'Invalid Date',
        'Enter a valid date using YYYY-MM-DD format.',
      );
      return;
    }

    if (editingId) {
      setItems(currentItems =>
        currentItems.map(item =>
          item.id === editingId
            ? {
                ...item,
                title: title.trim(),
                description: description.trim(),
                category,
                date: date.trim(),
              }
            : item,
        ),
      );
      Alert.alert('Updated', 'Your record has been updated.');
    } else {
      const newItem: OrganizerItem = {
        id: `${Date.now()}-${Math.random()}`,
        title: title.trim(),
        description: description.trim(),
        category,
        date: date.trim(),
        completed: false,
      };

      setItems(currentItems => [...currentItems, newItem]);
    }

    clearForm();
  };

  const editItem = (item: OrganizerItem) => {
    setTitle(item.title);
    setDescription(item.description);
    setCategory(item.category);
    setDate(item.date);
    setEditingId(item.id);
  };

  const deleteItem = (id: string) => {
    Alert.alert(
      'Delete Record',
      'Are you sure you want to delete this record?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setItems(currentItems =>
              currentItems.filter(item => item.id !== id),
            );

            if (editingId === id) {
              clearForm();
            }
          },
        },
      ],
    );
  };

  const toggleCompleted = (id: string) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id
          ? {...item, completed: !item.completed}
          : item,
      ),
    );
  };

  const filteredItems =
    filter === 'All'
      ? items
      : items.filter(item => item.category === filter);

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Loading your car-care records...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car Care Organizer</Text>
      <Text style={styles.subtitle}>
        Keep track of maintenance, expenses, and reminders.
      </Text>

      <Text style={styles.sectionTitle}>
        {editingId ? 'Update Record' : 'Add a Record'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Title (required)"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.categoryContainer}>
        {categories.slice(1).map(option => (
          <Pressable
            key={option}
            style={[
              styles.categoryButton,
              category === option && styles.selectedCategory,
            ]}
onPress={() => setCategory(option as OrganizerCategory)}>            <Text
              style={[
                styles.categoryText,
                category === option && styles.selectedCategoryText,
              ]}>
              {option}
            </Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />

      <Pressable style={styles.saveButton} onPress={saveItem}>
        <Text style={styles.buttonText}>
          {editingId ? 'Update Record' : 'Add Record'}
        </Text>
      </Pressable>

      {editingId && (
        <Pressable style={styles.cancelButton} onPress={clearForm}>
          <Text style={styles.buttonText}>Cancel Edit</Text>
        </Pressable>
      )}

      <Text style={styles.sectionTitle}>Filter Records</Text>

      <View style={styles.filterContainer}>
        {categories.map(option => (
          <Pressable
            key={option}
            style={[
              styles.filterButton,
              filter === option && styles.selectedFilter,
            ]}
            onPress={() => setFilter(option)}>
            <Text
              style={[
                styles.filterText,
                filter === option && styles.selectedFilterText,
              ]}>
              {option}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>
        My Records ({filteredItems.length})
      </Text>

      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="handled"
        renderItem={({item}) => (
          <View style={styles.itemCard}>
            <Text
              style={[
                styles.itemTitle,
                item.completed && styles.completedText,
              ]}>
              {item.title}
            </Text>

            <Text>Category: {item.category}</Text>
            <Text>Date: {item.date}</Text>

            {item.description ? (
              <Text>Description: {item.description}</Text>
            ) : null}

            <Text>
              Status: {item.completed ? 'Completed' : 'Not Completed'}
            </Text>

            <View style={styles.actions}>
              <Pressable
                style={styles.completeButton}
                onPress={() => toggleCompleted(item.id)}>
                <Text style={styles.buttonText}>
                  {item.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </Text>
              </Pressable>

              <Pressable
                style={styles.editButton}
                onPress={() => editItem(item)}>
                <Text style={styles.buttonText}>Edit</Text>
              </Pressable>

              <Pressable
                style={styles.deleteButton}
                onPress={() => deleteItem(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No records found. Add a record or choose another filter.
          </Text>
        }
      />
    </View>
  );
};

export default CarCareOrganizerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 8,
    padding: 8,
  },
  selectedCategory: {
    backgroundColor: '#333',
  },
  categoryText: {
    color: '#333',
  },
  selectedCategoryText: {
    color: 'white',
  },
  saveButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#777',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 8,
    padding: 8,
  },
  selectedFilter: {
    backgroundColor: '#333',
  },
  filterText: {
    color: '#333',
  },
  selectedFilterText: {
    color: 'white',
  },
  itemCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#777',
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  completeButton: {
    backgroundColor: '#287a45',
    padding: 9,
    borderRadius: 6,
  },
  editButton: {
    backgroundColor: '#315c91',
    padding: 9,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: '#9b3030',
    padding: 9,
    borderRadius: 6,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});