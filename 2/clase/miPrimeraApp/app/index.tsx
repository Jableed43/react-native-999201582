import { Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Clase02 from "./Clase02";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function Index() {
  const [nombre, setNombre] = useState("Javier Lopez")
  const [bio, setBio] = useState("Aprendiendo react native")
 // Vamos a armar una pagina de perfil
 //Foto de perfil, nombre y bio
 // A traves de inputs podemos modificar nombre y bio

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={{uri: "https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/3b9ea735965035.560633088d683.jpg"}} style={styles.avatar} ></Image>

      <Text style={styles.nombre}>{nombre}</Text>
      <Text >{bio}</Text>

      <View style={styles.card}>
      <Text style={styles.label}>Nombre: </Text>
      <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />
      
      <Text style={styles.label}>Biografia: </Text>
      <TextInput style={styles.input} value={bio} onChangeText={setBio} />
      </View>

      <Text>Editar app/index.tsx </Text>
      <Clase02 nombre={nombre} />
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 30 },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  nombre: { fontSize: 28, fontWeight: 'bold', marginTop: 10 },
  card: { width: '100%', backgroundColor: '#f9f9f9', padding: 15, borderRadius: 10 },
  label: { fontWeight: '600', marginBottom: 5, color: '#555' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 5, marginBottom: 15 },
  boton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, width: '100%', marginTop: 20 },
  botonTexto: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }
});