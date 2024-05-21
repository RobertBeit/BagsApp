import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, TouchableOpacity, TextInput } from 'react-native';
import { Card } from '@rneui/themed';

export default function Profile() {
  const [search, setSearch] = useState('');
  const [userdata, setUserData] = useState(null); // Initialize as null to check for empty data
  const [isLoading, setLoading] = useState(false);

  const getProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.bags.fm/api/v1/user/' + search);
      const users = await response.json();
      setUserData(users['response']); // Assuming users['response'] is a single object
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Search"
          placeholderTextColor="#003f5c"
          onChangeText={(search) => setSearch(search)}
        />
        <TouchableOpacity onPress={getProfile} style={styles.searchButton}>
          <Text style={styles.textButton}>Search</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        userdata && ( // Conditionally render the card if userdata is not null
          <Card containerStyle={styles.card}>
            <View style={styles.cardContent}>
              <Image source={{ uri: userdata.picture }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{userdata.username}</Text>
                <Text style={styles.score}>Rank: {userdata.rank}</Text>
              </View>
            </View>
          </Card>
        )
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
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    width: '90%',
    marginBottom: 20,
  },
  textInput: {
    height: 50,
    flex: 4,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  searchButton: {
    flex: 1,
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    backgroundColor: 'navy',
  },
  textButton: {
    color: 'white',
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