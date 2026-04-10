import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User } from '../services/api';

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => (
  <View style={styles.userItem}>
    <Text style={styles.userName}>{user.name}</Text>
    <Text style={styles.userEmail}>{user.email}</Text>
  </View>
);

const styles = StyleSheet.create({
  userItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#666',
    marginTop: 4,
  },
});
