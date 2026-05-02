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
import { Nota } from "@/types/nota";
import { NoteItem } from "./NoteItem";

interface TodoListScreenProps {
  nombreUsuario: string;
}

/**
 * Pantalla principal de la aplicación.
 * Gestiona la sincronización con Firebase Firestore en tiempo real y las preferencias del usuario.
 */
export const TodoListScreen = ({ nombreUsuario }: TodoListScreenProps) => {
  // --- ESTADOS ---
  const [notas, setNotas] = useState<Nota[]>([]); // Lista de notas sincronizada con la nube
  const [nuevaDescripcion, setNuevaDescripcion] = useState(""); // Texto del input para nuevas notas
  const [darkMode, setDarkMode] = useState(false); // Preferencia de tema visual
  const [loading, setLoading] = useState(false); // Carga inicial de datos de Firestore
  const [guardando, setGuardando] = useState(false); // Estado durante la creación de una nota

  // --- EFECTOS (Ciclo de Vida) ---

  /**
   * Efecto inicial: Carga la preferencia de Modo Oscuro desde el almacenamiento local.
   */
  useEffect(() => {
    const cargarDarkMode = async () => {
      const darkModeGuardado = await AsyncStorage.getItem("@app:darkMode");
      if(darkModeGuardado !== null){
        setDarkMode(JSON.parse(darkModeGuardado));
      }
    };
    cargarDarkMode();
  }, []);

  /**
   * Efecto de tiempo real: Se conecta a Firebase Firestore.
   * Crea un "listener" que escucha cambios en la colección 'notas' y actualiza el estado local automáticamente.
   */
  useEffect(() => {
    setLoading(true);
    // Definimos la consulta a la colección de notas
    const q = query(collection(db, "notas"));

    // onSnapshot abre un canal de comunicación (web socket) con Firestore
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Mapeamos los documentos de Firestore al formato de nuestra interfaz Nota
      const notasData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Nota));
      
      setNotas(notasData); // Actualizamos la UI
      setLoading(false);
    }, (error) => {
      console.error("Error en el listener de Firestore:", error);
      setLoading(false);
    });
    
    // IMPORTANTE: Al desmontar el componente, cerramos la conexión para evitar fugas de memoria
    return () => unsubscribe();
  }, []);

  // --- ACCIONES (CRUD) ---

  /**
   * Cambia el tema de la aplicación y persiste la elección.
   */
  const toggleDarkMode = async (valor: boolean) => {
    setDarkMode(valor);
    await AsyncStorage.setItem("@app:darkMode", JSON.stringify(valor));
  };

  /**
   * Agrega una nueva nota a la base de datos de Firestore.
   */
  const agregarNota = async () => {
    if (!nuevaDescripcion.trim() || guardando) return;
    
    setGuardando(true);
    try {
      // addDoc genera automáticamente un ID único en Firestore
      await addDoc(collection(db, "notas"), {
        nombre: nombreUsuario,
        descripcion: nuevaDescripcion.trim(),
        estado: false, // Por defecto la nota está pendiente
        createdAt: new Date().getTime() // Marca de tiempo para ordenamiento
      });
      setNuevaDescripcion(""); // Limpiamos el input
    } catch (error) {
      console.error("Error al agregar nota:", error);
      alert("Error al conectar con la base de datos");
    } finally {
      setGuardando(false);
    }
  };

  /**
   * Actualiza el estado de una nota (completada/pendiente) en Firestore.
   */
  const toggleNota = async (id: string) => {
    try {
      const notaRef = doc(db, "notas", id); // Referencia al documento específico
      const nota = notas.find(n => n.id === id);
      if (nota) {
        // updateDoc solo modifica los campos indicados
        await updateDoc(notaRef, {
          estado: !nota.estado
        });
      }
    } catch (error) {
      console.error("Error al actualizar nota:", error);
    }
  };

  /**
   * Elimina permanentemente una nota de Firestore.
   */
  const eliminarNota = async (id: string) => {
    try {
      await deleteDoc(doc(db, "notas", id));
    } catch (error) {
      console.error("Error al eliminar nota:", error);
    }
  };

  // Calcular notas pendientes
  const notasPendientes = notas.filter((n) => !n.estado).length;

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
          renderItem={({ item }) => (
            <NoteItem 
              item={item} 
              darkMode={darkMode} 
              onToggle={toggleNota} 
              onDelete={eliminarNota} 
            />
          )}
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
};

const styles = StyleSheet.create({
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
  vacio: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  textoVacioIcono: { fontSize: 64, marginBottom: 20 },
  textoVacioIconoDark: { opacity: 0.8 },
  textoVacio: { fontSize: 18, fontWeight: '600', color: 'black', marginTop: 10, textAlign: 'center' },
  textoVacioDark: { color: 'white' },
});
