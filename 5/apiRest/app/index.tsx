import { FastPostButton } from "@/components/FastPostButton";
import { API_URL } from "@/constants/api";
import React, { useEffect, useState } from "react";
import { 
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet, 
  Text, 
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export default function Index() {

  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL)
      // antes de convertir la respuesta quiero saber si hay algun error
      if(!response.ok){
        throw new Error("Error en el servidor")
      }
      // Necesitamos otro await para manejar los datos y convertirlos de json a objeto de js
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      Alert.alert("Error", "no se pudo conectar")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']} >
      <View style={styles.header}>
        <Text style={styles.title} >
          Lista de usuarios
        </Text>
        {/* Cuando cree el nuevo usuario, a traves de onFinish vuelve a realizar el llamado
        entonces muestra el nuevo listado con el nuevo usuario */}
        <FastPostButton onFinish={fetchUsers} />
      </View>

    {loading && users.length === 0 ? (
      <View style={styles.centered}>
        {/* Spinner de carga */}
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ): (
      <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
          <View style={styles.userItem}> 
            <Text style={styles.userName} > {item.name} </Text>
            <Text style={styles.userEmail} > {item.email} </Text>
          </View>
        )}
        refreshing={loading}
        onRefresh={fetchUsers}
        // Que pasa si no hay usuarios?
        ListEmptyComponent={
          <View style={styles.centered} >
            <Text>No hay usuarios disponibles.</Text>
          </View>
        }
      />
    ) }

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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  userItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#666',
    marginTop: 4,
  },
});
