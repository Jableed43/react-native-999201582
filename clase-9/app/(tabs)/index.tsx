import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LoginScreen } from "@/components/LoginScreen";
import { TodoListScreen } from "@/components/TodoListScreen";

/**
 * Componente Raíz de la aplicación.
 * Se encarga de la lógica de "auth" básica: decide si mostrar el Login o la lista de Notas.
 */
export default function App() {
  const [nombreUsuario, setNombreUsuario] = useState<string | null>(null); // null significa no identificado
  const [loading, setLoading] = useState(true); // Controla la pantalla de carga inicial

  /**
   * Al iniciar la app, verificamos si ya existe un nombre guardado en el dispositivo.
   */
  useEffect(() => {
    const cargarNombre = async () => {
      try {
        const nombre = await AsyncStorage.getItem("@app:nombre");
        if (nombre !== null) {
          setNombreUsuario(nombre); // Si existe, saltamos directamente a la TodoList
        }
      } catch (error) {
        console.error('Error al cargar nombre:', error);
      } finally {
        setLoading(false); // Terminamos la carga inicial
      }
    };
    cargarNombre();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  return nombreUsuario ? (
    <TodoListScreen nombreUsuario={nombreUsuario} />
  ) : (
    <LoginScreen onLogin={setNombreUsuario} />
  );
}

const styles = StyleSheet.create({
  loadingContainer: { 
    flex: 1, 
    backgroundColor: '#f5f5f5', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
});

