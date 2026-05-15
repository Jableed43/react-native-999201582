import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import MainNavigator from './src/navigation/MainNavigator';

/**
 * STARTER KIT - CLASE 10
 * El objetivo de hoy es construir la navegación anidada
 * y las animaciones desde cero sobre esta base estable.
 */
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <MainNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 20, fontWeight: 'bold' },
  subtext: { color: '#666', marginTop: 10 }
});
