import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  updateDoc, 
  deleteDoc, 
  doc,
  query
} from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

// Tipo para las notas
interface Nota {
  id: string;
  nombre: string;
  descripcion: string;
  estado: boolean;
}

// ============================================
// PANTALLA DE LOGIN (Skeleton)
// ============================================
function LoginScreen({ onLogin }: { onLogin: (nombre: string) => void }) {
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (nombre.trim()) {
      setLoading(true);
      try {
        // TODO: Paso 1 - Guardar nombre en AsyncStorage
        // await AsyncStorage.setItem('@app:nombre', nombre.trim());
        // onLogin(nombre.trim());
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
}

// ============================================
// PANTALLA PRINCIPAL DE TAREAS (Skeleton)
// ============================================
function TodoListScreen({ nombreUsuario }: { nombreUsuario: string }) {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [nuevaDescripcion, setNuevaDescripcion] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false); // Cambiado a false para el starter
  const [guardando, setGuardando] = useState(false);

  // Cargar preferencia de dark mode desde AsyncStorage
  useEffect(() => {
    const cargarDarkMode = async () => {
      // TODO: Paso 2 - Cargar preferencia de dark mode
    };
    cargarDarkMode();
  }, []);

  const toggleDarkMode = async (valor: boolean) => {
    setDarkMode(valor);
    // TODO: Paso 3 - Guardar preferencia de dark mode
  };

  // ============================================
  // FIRESTORE: Leer notas en tiempo real
  // ============================================
  useEffect(() => {
    // TODO: Paso 4 - Conectar listener de Firestore (onSnapshot)
    // El listener debe actualizar el estado 'notas'
    
    return () => {
      // No olvidar el cleanup!
    };
  }, []);

  // ============================================
  // FIRESTORE: CRUD Operaciones
  // ============================================
  const agregarNota = async () => {
    if (!nuevaDescripcion.trim() || guardando) return;
    
    // TODO: Paso 5 - addDoc en Firestore
  };

  const toggleNota = async (id: string) => {
    // TODO: Paso 6 - updateDoc en Firestore (cambiar estado)
  };

  const eliminarNota = async (id: string) => {
    // TODO: Paso 7 - deleteDoc en Firestore
  };

  // Calcular notas pendientes
  const notasPendientes = notas.filter((n) => !n.estado).length;

  const renderItem = ({ item }: { item: Nota }) => (
    <View style={[styles.itemContainer, darkMode && styles.itemContainerDark]}>
      <TouchableOpacity style={styles.item} onPress={() => toggleNota(item.id)}>
        <View style={[styles.checkbox, darkMode && styles.checkboxDark, item.estado && styles.checkboxCompletado]}>
          {item.estado && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <View style={styles.textoContainer}>
          <Text style={[styles.textoDescripcion, darkMode && styles.textoDescripcionDark, item.estado && styles.textoDescripcionCompletado]}>
            {item.descripcion}
          </Text>
          {item.nombre && <Text style={[styles.textoNombre, darkMode && styles.textoNombreDark]}>Por: {item.nombre}</Text>}
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botonEliminar} onPress={() => eliminarNota(item.id)}>
        <Text style={styles.textoEliminar}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.containerDark]}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.titulo, darkMode && styles.tituloDark]}>Hola, {nombreUsuario}!</Text>
            <Text style={[styles.contador, darkMode && styles.contadorDark]}>
              {`${notasPendientes} ${notasPendientes === 1 ? "nota pendiente" : "notas pendientes"}`}
            </Text>
          </View>
          <View style={styles.switchContainer}>
            <Text style={[styles.switchLabel, darkMode && styles.switchLabelDark]}>Modo Oscuro</Text>
            <Switch value={darkMode} onValueChange={toggleDarkMode} />
          </View>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, darkMode && styles.inputDark]}
          placeholder="Escribe una nueva nota..."
          placeholderTextColor={darkMode ? '#999' : '#999'}
          value={nuevaDescripcion}
          onChangeText={setNuevaDescripcion}
          onSubmitEditing={agregarNota}
          editable={!guardando}
        />
        <TouchableOpacity style={[styles.botonAgregar, guardando && styles.botonAgregarDisabled]} onPress={agregarNota} disabled={guardando}>
          {guardando ? <ActivityIndicator color="white" size="small" /> : <Text style={styles.textoBotonAgregar}>Agregar</Text>}
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.vacio}><ActivityIndicator size="large" color="#007AFF" /></View>
      ) : (
        <FlatList
          data={notas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.lista}
          ListEmptyComponent={
            <View style={styles.vacio}>
              <Text style={[styles.textoVacioIcono, darkMode && styles.textoVacioIconoDark]}>📝</Text>
              <Text style={[styles.textoVacio, darkMode && styles.textoVacioDark]}>No hay notas todavía</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function App() {
  const [nombreUsuario, setNombreUsuario] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarNombre = async () => {
      try {
        // TODO: Paso 0 - Recuperar nombre de AsyncStorage al iniciar
        // const nombre = await AsyncStorage.getItem('@app:nombre');
        // if (nombre) setNombreUsuario(nombre);
      } catch (error) {
        console.error('Error al cargar nombre:', error);
      } finally {
        setLoading(false);
      }
    };
    cargarNombre();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loginContainer}>
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
  loginContainer: { flex: 1, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center', padding: 20 },
  loginContent: { width: '100%', maxWidth: 400 },
  loginTitle: { fontSize: 32, fontWeight: 'bold', color: '#333', marginBottom: 10, textAlign: 'center' },
  loginSubtitle: { fontSize: 16, color: '#666', marginBottom: 30, textAlign: 'center' },
  loginInput: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 15, fontSize: 16, backgroundColor: 'white', marginBottom: 20 },
  loginButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  loginButtonDisabled: { opacity: 0.6 },
  loginButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  container: { flex: 1, backgroundColor: 'white' },
  containerDark: { backgroundColor: '#121212' },
  header: { padding: 20 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: 'black', marginBottom: 5 },
  tituloDark: { color: 'white' },
  switchContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  switchLabel: { fontSize: 14, color: 'black' },
  switchLabelDark: { color: 'white' },
  contador: { fontSize: 16, color: 'black' },
  contadorDark: { color: 'white' },
  inputContainer: { flexDirection: 'row', padding: 15 },
  input: { flex: 1, borderWidth: 1, borderColor: 'gray', padding: 10, marginRight: 10, backgroundColor: 'white', color: 'black', borderRadius: 8 },
  inputDark: { backgroundColor: '#1e1e1e', borderColor: '#444', color: 'white' },
  botonAgregar: { backgroundColor: '#007AFF', padding: 10, borderRadius: 8, justifyContent: 'center', minWidth: 80 },
  botonAgregarDisabled: { opacity: 0.6 },
  textoBotonAgregar: { color: 'white', fontWeight: '600', textAlign: 'center' },
  lista: { flex: 1 },
  itemContainer: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderBottomColor: 'gray', backgroundColor: 'white' },
  itemContainerDark: { backgroundColor: '#1e1e1e', borderBottomColor: '#444' },
  item: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  textoContainer: { flex: 1 },
  textoDescripcion: { fontSize: 16, flex: 1, color: 'black' },
  textoDescripcionDark: { color: 'white' },
  textoDescripcionCompletado: { textDecorationLine: 'line-through', opacity: 0.6 },
  textoNombre: { fontSize: 12, color: '#666', marginTop: 4 },
  textoNombreDark: { color: '#999' },
  checkbox: { width: 24, height: 24, borderWidth: 2, borderColor: 'gray', marginRight: 10, borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
  checkboxDark: { borderColor: '#666' },
  checkboxCompletado: { backgroundColor: 'green', borderColor: 'green' },
  checkmark: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  botonEliminar: { padding: 10, justifyContent: 'center' },
  textoEliminar: { fontSize: 20 },
  vacio: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  textoVacioIcono: { fontSize: 64, marginBottom: 20 },
  textoVacioIconoDark: { opacity: 0.8 },
  textoVacio: { fontSize: 18, fontWeight: '600', color: 'black', marginTop: 10, textAlign: 'center' },
  textoVacioDark: { color: 'white' },
});
