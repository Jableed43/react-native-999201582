import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Motion } from "@legendapp/motion";

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <View style={styles.container}>
      <Motion.View
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 600 }}
        style={styles.card}
      >
        <Text style={styles.title}>Motion Vault</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

        <TouchableOpacity style={styles.button} onPress={onLogin}>
            <Text>
                Entrar como invitado
            </Text>
        </TouchableOpacity>
      </Motion.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1c1c1e",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#8e8e93",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
