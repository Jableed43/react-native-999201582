import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Accelerometer } from "expo-sensors";

type SensorData = {
  x: number;
  y: number;
  z: number;
};

export default function SensorsScreen() {
  const [accelerometerData, setAccelerometerData] = useState<SensorData | null>(
    null,
  );

  const [isActive, setIsActive] = useState({
    accelerometer: false,
  });

  // Los sensores una vez que empiezan a leer informacion siguen enviando datos
  // en segundo plano. si no se remueven los listeners se agota la bateria.

  useEffect(() => {
    return () => {
      Accelerometer.removeAllListeners();
    };
  }, []);

  const startAccelerometer = () => {
    if (isActive.accelerometer) {
      stopAccelerometer();
      return;
    }
    // Cada cuantos milisegundos queremos recibir datos -> 100ms
    // valores muy bajos como 10ms pueden saturar el bridge de react native
    Accelerometer.setUpdateInterval(100);

    Accelerometer.addListener((data) => {
      setAccelerometerData(data);
    });

    setIsActive((prev) => ({ ...prev, accelerometer: true }));
  };

  const stopAccelerometer = () => {
    Accelerometer.removeAllListeners();
    setAccelerometerData(null);
    setIsActive((prev) => ({ ...prev, accelerometer: false }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sensores de dispositivos</Text>
        <Text style={styles.subtitle}>
          
          Activa un sensor para ver datos en tiempo real
        </Text>
      </View>

      {/* Acelerometro */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="phone-portrait" size={32} color="blue" />
          <Text style={styles.cardTitle}> Acelerómetro </Text>
          {/* Funciona bajo la condicion de que el acelerometro este activo */}
          {isActive.accelerometer && (
            <View style={styles.activeIndicator}>
              <View style={[styles.activeDot, { backgroundColor: "green" }]}>
                
              </View>
              <Text style={styles.activeText}>Activo</Text>
            </View>
          )}
        </View>
        <View style={styles.dataContainer}>
          {/* Informacion del acelerometro */}
          {accelerometerData ? (
            <>
              <Text style={styles.dataText}>
                
                X: {accelerometerData.x.toFixed(2)}
              </Text>
              <Text style={styles.dataText}>
                
                Y: {accelerometerData.y.toFixed(2)}
              </Text>
              <Text style={styles.dataText}>
                
                Z: {accelerometerData.z.toFixed(2)}
              </Text>
            </>
          ) : (
            <Text style={styles.dataPlaceholder}>Presiona para iniciar</Text>
          )}
        </View>

        <TouchableOpacity onPress={startAccelerometer}>
          <Ionicons
            name={isActive.accelerometer ? "stop" : "play"}
            size={20}
            color="black"
          />
          <Text style={styles.buttonText}>
            {isActive.accelerometer ? "Detener" : "Iniciar"} Acelerómetro
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  card: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#45B7D1",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  activeIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  dataContainer: {
    backgroundColor: "#F5F5F5",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    minHeight: 80,
    justifyContent: "center",
  },
  dataText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
    fontFamily: "monospace",
  },
  dataPlaceholder: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
  },
});
