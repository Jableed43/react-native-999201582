import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

/**
 * STARTER KIT - CLASE 10
 * El objetivo de hoy es construir la navegación anidada
 * y las animaciones desde cero sobre esta base estable.
 */
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text style={styles.text}>¡Listo para empezar la Clase 10!</Text>
        <Text style={styles.subtext}>Edita App.tsx para comenzar a integrar MainNavigator</Text>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 20, fontWeight: 'bold' },
  subtext: { color: '#666', marginTop: 10 }
});
