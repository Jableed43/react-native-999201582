import React, { useState } from "react";
import { 
  Text, 
  View, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet, 
  TextInput,
  TouchableOpacity
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetUsers } from "../hooks/api/useGetUsers";
import { UserCard } from "../components/UserCard";

export default function Index() {
  const router = useRouter();
  const { users, loading, error, refetch } = useGetUsers();
  const [search, setSearch] = useState("");

  // Sin useMemo: Se filtra en cada renderizado
  const getFilteredUsers = () => {
    if (!search.trim()) return users;
    return users.filter(user => 
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  };

  const handleGoToCreate = () => {
    router.push("/create-user");
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de Usuarios</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleGoToCreate}>
          <Text style={styles.addButtonText}>+ Nuevo Usuario</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Buscar usuario..."
          value={search}
          onChangeText={setSearch}
        />
      </View>
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
          data={getFilteredUsers()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <UserCard user={item} />}
          refreshing={loading}
          onRefresh={refetch}
          ListEmptyComponent={
            <View style={styles.centered}>
              <Text>No hay resultados.</Text>
            </View>
          }
        />
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
  }
});
