import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginScreenProps {
  onLogin: (nombre: string) => void;
}

/**
 * Pantalla inicial de acceso.
 * Permite al usuario identificarse y guarda su nombre localmente para futuras sesiones.
 */
export const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [nombre, setNombre] = useState(""); // Estado local para el campo de texto
  const [loading, setLoading] = useState(false); // Estado para mostrar el indicador de carga

  /**
   * Procesa el intento de login.
   * Valida que el nombre no esté vacío, lo persiste en el dispositivo y notifica al componente padre.
   */
  const handleLogin = async () => {
    if (nombre.trim()) {
      setLoading(true);
      try {
        // Persistencia local: Guardamos el nombre para que la app lo recuerde al reiniciar
        // Usamos una clave con prefijo '@app:' por convención
        await AsyncStorage.setItem("@app:nombre", nombre.trim());
        
        // Ejecutamos el callback para actualizar el estado global en App
        onLogin(nombre.trim());
      } catch (error) {
        console.error('Error al guardar nombre:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={styles.loginContent}>
        <Text style={styles.loginTitle}>Bienvenido</Text>
        <Text style={styles.loginSubtitle}>Ingresa tu nombre para comenzar</Text>
        
        <TextInput
          style={styles.loginInput}
          placeholder="Tu nombre"
          placeholderTextColor="#999"
          value={nombre}
          onChangeText={setNombre}
          onSubmitEditing={handleLogin}
          autoCapitalize="words"
        />
        
        <TouchableOpacity
          style={[styles.loginButton, loading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={loading || !nombre.trim()}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.loginButtonText}>Entrar</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginContainer: { flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center', padding: 20 },
  loginContent: { width: '100%', maxWidth: 400 },
  loginTitle: { fontSize: 32, fontWeight: 'bold', color: '#333', marginBottom: 10, textAlign: 'center' },
  loginSubtitle: { fontSize: 16, color: '#666', marginBottom: 30, textAlign: 'center' },
  loginInput: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 15, fontSize: 16, backgroundColor: 'white', marginBottom: 20 },
  loginButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  loginButtonDisabled: { opacity: 0.6 },
  loginButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});
