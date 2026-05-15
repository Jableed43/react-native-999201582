import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AnimatedScreen from '../components/AnimatedScreen';

export default function HomeScreen() {
  return (
    <AnimatedScreen>
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text>Aquí codearemos la lista animada...</Text>
    </View>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' }
});
