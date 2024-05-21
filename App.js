import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator,Image } from 'react-native';
import { Card } from '@rneui/themed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import Profile from './Profile';
import LeaderBoard from './LeaderBoard';
const Tab = createBottomTabNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
    <Tab.Navigator>
       
        <Tab.Screen options={{headerShown: false}} name="LeaderBoard" component={LeaderBoard} />
        <Tab.Screen options={{headerShown: false}} name="Profile" component={Profile} />
        
        
      </Tab.Navigator>
      </NavigationContainer>
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