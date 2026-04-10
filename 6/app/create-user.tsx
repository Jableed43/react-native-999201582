import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  Alert 
} from "react-native";
import { useRouter } from "expo-router";
import { usePostUser } from "../hooks/api/usePostUser";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateUser() {
  const router = useRouter();
  const { saveUser, loading } = usePostUser();
  
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!name || !username || !email) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    const success = await saveUser({ name, username, email });
    if (success) {
      Alert.alert("¡Éxito!", "Usuario creado correctamente");
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nuevo Usuario</Text>
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
            <Text style={styles.buttonText}>Crear Usuario</Text>
          )}
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
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#94d3a2",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
