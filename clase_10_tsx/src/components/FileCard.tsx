import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FileCard() {
  // Aquí construiremos el componente animado con Motion.Pressable
  return (
    <View style={styles.card}>
      <Text>Item de lista</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 20, backgroundColor: '#fff', marginVertical: 5 }
});
