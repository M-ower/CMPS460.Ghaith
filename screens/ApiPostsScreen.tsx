
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';
import type { ApiPost } from '../data/ApiPost';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function ApiPostsScreen() {
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}.`);
      }

      const data: unknown = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('The API returned an unexpected response.');
      }

      setPosts(data as ApiPost[]);
    } catch (err) {
      console.error('API request failed:', err);

      setError(
        'Unable to load posts. Check your internet connection and try again.',
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadPosts();
  }, [loadPosts]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    void loadPosts();
  }, [loadPosts]);

  const renderPost = ({ item }: { item: ApiPost }) => (
    <View style={styles.card}>
      <Text style={styles.postNumber}>Post #{item.id}</Text>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody}>{item.body}</Text>
      <Text style={styles.userId}>User ID: {item.userId}</Text>
    </View>
  );

  if (loading && posts.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.message}>Loading posts...</Text>
      </View>
    );
  }

  if (error && posts.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.heading}>API Data Viewer</Text>
        <Text style={styles.subtitle}>
          Posts loaded from an external API
        </Text>
        <Text style={styles.error}>{error}</Text>

        <Pressable
          accessibilityRole="button"
          onPress={() => void loadPosts()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>API Data Viewer</Text>
      <Text style={styles.subtitle}>
        Posts loaded from an external API
      </Text>

      {error !== null && (
        <Text style={styles.error}>
          Refresh failed. Please try again.
        </Text>
      )}

      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderPost}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        ListEmptyComponent={
          <Text style={styles.message}>No posts are available.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    padding: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  postNumber: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  postTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  postBody: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 21,
  },
  userId: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 12,
  },
  message: {
    color: '#4b5563',
    fontSize: 15,
    marginTop: 12,
    textAlign: 'center',
  },
  error: {
    color: '#b91c1c',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});