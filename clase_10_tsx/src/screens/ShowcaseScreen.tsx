import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * LABORATORIO DE ANIMACIONES
 * Props para experimentar:
 * - initial: { opacity, scale, rotate, y }
 * - animate: { opacity, scale, rotate, y }
 * - transition: { type: 'spring' | 'tween', damping, stiffness, delay }
 */
export default function ShowcaseScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Laboratorio de Animaciones</Text>
      <Text>Pruebas de Legend Motion aquí...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' }
});
