import React, { useMemo, useState } from "react";
import { 
  Text, 
  View, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet, 
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetUsers } from "../hooks/api/useGetUsers";
import { useDeleteUser } from "../hooks/api/useDeleteUser";
import { UserCard } from "../components/UserCard";
import { User } from "../services/api";
import { useTheme } from "@/context/ThemeContext";

export default function Index() {
  const router = useRouter();
  const { users, loading, error, refetch } = useGetUsers();
  const { removeUser, loading: deleting } = useDeleteUser();
  const [search, setSearch] = useState("");
  const { colors, theme, toggleTheme } = useTheme()

  const getFilteredUsers = useMemo(() => {
    if(!search.trim()){
      return users
    }
    return users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) || 
      user.email.toLowerCase().includes(search.toLowerCase())
    )
  }, [users, search])

  const handleGoToCreate = () => {
    router.push("/create-user");
  };

  const handleDelete = async (id: number) => {
    Alert.alert(
      "Confirmar",
      "¿Estás seguro de que deseas eliminar este usuario?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive",
          onPress: async () => {
             const success = await removeUser(id);
             if (success) {
               refetch(); // Refetch explícito después de borrar
             }
          }
        }
      ]
    );
  };

  const handleEdit = (user: User) => {
    router.push({
      pathname: "/edit-user",
      params: { 
        id: user.id.toString(),
        name: user.name,
        username: user.username,
        email: user.email
      }
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refetch}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={[styles.header, {backgroundColor: colors.card, borderColor: colors.border}]}>
        <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme} >
          <Text style={{fontSize: 20}}> { theme === 'light' ? "🌙" : "☀" } </Text>
        </TouchableOpacity>
        <Text style={[styles.title, {color: colors.text}]}>Lista de Usuarios</Text>
        <TouchableOpacity style={[styles.addButton, {backgroundColor: colors.primary}]} onPress={handleGoToCreate}>
          <Text style={styles.addButtonText}>+ Nuevo Usuario</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.searchContainer, {backgroundColor: colors.background, borderBottomColor: colors.border}]}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Buscar usuario..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Indicador de Refetch Explícito */}
      {loading && users.length > 0 && (
        <View style={styles.refetchIndicator}>
          <ActivityIndicator size="small" color="#007bff" />
          <Text style={styles.refetchText}>Actualizando lista...</Text>
        </View>
      )}

      <TouchableOpacity 
        style={styles.labButton} 
        onPress={() => router.push("/ref-example")}
      >
        <Text style={styles.labButtonText}>🧪 Ver Laboratorio useRef (Clase 06)</Text>
      </TouchableOpacity>

      {loading && users.length === 0 ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={getFilteredUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <UserCard 
              user={item} 
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
          refreshing={loading}
          onRefresh={refetch}
          ListEmptyComponent={
            <View style={styles.centered}>
              <Text>No hay resultados.</Text>
            </View>
          }
        />
      )}
      
      {deleting && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f1f3f5',
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  retryButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  retryText: {
    color: '#fff',
  },
  labButton: {
    backgroundColor: '#ebf5ff',
    margin: 10,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007bff',
    alignItems: 'center',
    borderStyle: 'dashed',
  },
  labButtonText: {
    color: '#007bff',
    fontWeight: '600',
    fontSize: 15,
  },
  refetchIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#e7f3ff',
  },
  refetchText: {
    marginLeft: 10,
    color: '#007bff',
    fontWeight: '600',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeToggle: {
    padding: 8
  }
});
