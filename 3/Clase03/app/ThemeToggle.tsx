import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.titulo, darkMode && styles.tituloDark]}>
          Modo Actual: {darkMode ? 'Oscuro 🌙' : 'Claro ☀️'}
        </Text>
        <Switch 
          value={darkMode} 
          onValueChange={setDarkMode} 
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={darkMode ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>
      
      <View style={[styles.card, darkMode && styles.cardDark]}>
        <Text style={[styles.cardText, darkMode && styles.cardTextDark]}>
          Este es un ejemplo de cómo el estado `darkMode` cambia los colores
          de fondo y de texto de forma independiente en este componente.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 20 },
  containerDark: { backgroundColor: '#121212' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: 'black' },
  tituloDark: { color: 'white' },
  card: { padding: 20, backgroundColor: '#f9f9f9', borderRadius: 10, borderWidth: 1, borderColor: '#ddd' },
  cardDark: { backgroundColor: '#1e1e1e', borderColor: '#444' },
  cardText: { fontSize: 16, color: '#333', lineHeight: 24 },
  cardTextDark: { color: '#ccc' }
});
