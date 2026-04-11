import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  Alert 
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useUpdateUser } from "../hooks/api/useUpdateUser";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditUser() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { editUser, loading } = useUpdateUser();
  
  const [name, setName] = useState(params.name as string || "");
  const [username, setUsername] = useState(params.username as string || "");
  const [email, setEmail] = useState(params.email as string || "");

  const handleSubmit = async () => {
    if (!name || !username || !email) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    const userId = parseInt(params.id as string);
    const success = await editUser(userId, { name, username, email });
    
    if (success) {
      Alert.alert("¡Éxito!", "Usuario actualizado correctamente");
      router.back(); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Editar Usuario</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput 
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Juan Perez"
        />

        <Text style={styles.label}>Username</Text>
        <TextInput 
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="juanp"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput 
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="juan@mail.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Guardar Cambios</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={() => router.back()}
          disabled={loading}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#94c2ed",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 15,
    padding: 15,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#6c757d",
    fontSize: 16,
  },
});
