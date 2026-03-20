import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Tarea {
  id: string;
  texto: string;
  completada: boolean;
}

//  Todos los formularios controlados tienen:
//  - En el value del input el estado
// - Cada input va a tener un estado


export default function TodoList() {
  // Estado de listado de tareas
  const [tareas, setTareas] = useState<Tarea[]>([])
  // Estado de tarea nueva - La tarea posee id, texto y completada, pero en el estado
  // solo colocamos "" ya que el input solo sera de texto
  const [nuevaTarea, setNuevaTarea] = useState("")

  const tareasPendientes = tareas.filter((t: Tarea) => !t.completada).length;

  const agregarTarea = () => {
    if(nuevaTarea.trim()){
      const nueva: Tarea = { id: Date.now().toString(), texto: nuevaTarea.trim(), completada: false  }
      // spread operator en tareas
      setTareas([...tareas, nueva])
      // limpia el input dejandolo vacio al añadir una nueva tarea
      setNuevaTarea("")
    }
  }

  // Cambia completada de true a false y viceversa
  const toggleTarea = (id: string) => {
    setTareas(tareas.map((tarea: Tarea) => tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea))
  }

  // asi como un filtro permite obtener lo que quiero, de forma opuesta puede discriminar lo que no quiero
  const eliminarTarea = (id: string) => {
    // filter crea un nuevo array sin la tarea con el id que le pasaste por parametro
    setTareas(tareas.filter((tarea: Tarea) => tarea.id !== id))
  }

  const renderItem = ({item}: {item: Tarea}) => (
    <View style={styles.itemContainer} >
      <TouchableOpacity style={styles.item} onPress={() => toggleTarea(item.id)} >
        <View style={[styles.checkbox, item.completada && styles.checkboxCompletado]} >
          {item.completada && <Text style={styles.checkmark} > ✔ </Text> }
        </View>
        <Text style={[styles.textoTarea, item.completada && styles.textoTareaCompletado]} > {item.texto} </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => eliminarTarea(item.id) } >
        <Text style={styles.textoEliminar} > 🗑 </Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo} >Mi Lista de Tareas</Text>
      
      <Text>{`${tareasPendientes} pendiente${tareasPendientes !== 1 ? 's' : ''}`}</Text>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input}
        placeholder="Escribe una tarea..."
        value={nuevaTarea}
        onChangeText={setNuevaTarea}
        />
        <TouchableOpacity style={styles.boton} onPress={agregarTarea}>
          <Text style={styles.botonTexto}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tareas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold' },
  contador: { fontSize: 16, color: '#666', marginBottom: 20 },
  inputContainer: { flexDirection: 'row', marginBottom: 20 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 },
  boton: { backgroundColor: '#007AFF', padding: 15, marginLeft: 10, borderRadius: 5 },
  botonTexto: { color: 'white', fontWeight: 'bold' },
  itemContainer: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
  item: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  checkbox: { width: 22, height: 22, borderWidth: 2, borderColor: '#007AFF', marginRight: 10, justifyContent: 'center', alignItems: 'center' },
  checkboxCompletado: { backgroundColor: '#007AFF' },
  checkmark: { color: 'white', fontSize: 14 },
  textoTarea: { fontSize: 16 },
  textoTareaCompletado: { textDecorationLine: 'line-through', color: '#aaa' },
  textoEliminar: { fontSize: 20, marginLeft: 10 }
});
