import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import UseRefExample from '../components/UseRefExample';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RefExampleScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Configuramos el header de la navegación */}
      <Stack.Screen 
        options={{ 
          title: "Ejemplo de useRef",
          headerShown: true 
        }} 
      />
      
      <View style={styles.content}>
        <UseRefExample />
      </View>

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>← Volver a la Lista</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  backButton: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  backText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
