import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image } from 'react-native';
import { Card } from '@rneui/themed';

export default function LeaderBoard() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isRefreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getLeaderboard = async (pageNum = 1) => {
    if (!hasMore && pageNum !== 1) return; // If no more data, don't fetch
    setLoading(true);
    try {
      const response = await fetch(`https://api.bags.fm/api/v1/user/get_user_leaderboard?page=${pageNum}`);
      const leaderboard = await response.json();
      const newData = leaderboard['response'];
      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setData(prevData => (pageNum === 1 ? newData : [...prevData, ...newData]));
        setPage(pageNum);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLeaderboard();
  }, []);

  const loadMoreData = () => {
    if (!isLoading) {
      getLeaderboard(page + 1);
    }
  };

  const renderItem = ({ item }) => (
    <Card containerStyle={styles.card}>
      <View style={styles.cardContent}>
        <Image source={{ uri: item.picture }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.username}</Text>
          <Text style={styles.score}>Points: {item.points}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      {isLoading && page === 1 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item['_id'].toString()}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={isLoading ? <ActivityIndicator size="small" color="#0000ff" /> : null}
          style={styles.list}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: 10,
    width: '90%',
    margin: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 16,
    color: '#666',
  },
  list: {
    width: '100%',
  },
});