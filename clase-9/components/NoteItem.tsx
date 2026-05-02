import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Nota } from '@/types/nota';

interface NoteItemProps {
  item: Nota;
  darkMode: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * Componente que representa un ítem individual en la lista de tareas.
 * Maneja la visualización del estado (completado/pendiente) y las acciones de usuario.
 */
export const NoteItem = ({ item, darkMode, onToggle, onDelete }: NoteItemProps) => {
  return (
    // Aplicamos estilos condicionales basados en el modo oscuro
    <View style={[styles.itemContainer, darkMode && styles.itemContainerDark]}>
      
      {/* Área principal interactiva: Permite marcar/desmarcar la nota */}
      <TouchableOpacity style={styles.item} onPress={() => onToggle(item.id)}>
        
        {/* Checkbox visual: Cambia de color si la nota está completada */}
        <View style={[
          styles.checkbox, 
          darkMode && styles.checkboxDark, 
          item.estado && styles.checkboxCompletado
        ]}>
          {item.estado && <Text style={styles.checkmark}>✓</Text>}
        </View>

        {/* Contenedor de textos: Descripción y autor */}
        <View style={styles.textoContainer}>
          <Text style={[
            styles.textoDescripcion, 
            darkMode && styles.textoDescripcionDark, 
            item.estado && styles.textoDescripcionCompletado // Tachado si está completado
          ]}>
            {item.descripcion}
          </Text>
          {item.nombre && (
            <Text style={[styles.textoNombre, darkMode && styles.textoNombreDark]}>
              Por: {item.nombre}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      {/* Botón de eliminación lateral */}
      <TouchableOpacity style={styles.botonEliminar} onPress={() => onDelete(item.id)}>
        <Text style={styles.textoEliminar}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
