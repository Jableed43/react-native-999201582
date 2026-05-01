import { useRef, useState } from "react";
import {CameraType, CameraView, useCameraPermissions} from 'expo-camera'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 

export default function CameraScreen() {
    const [facing, setFacing] = useState<CameraType>('back')
    const [permission, requestPermission] = useCameraPermissions()
 // permision puede ser granted, denied, canAskAgain
 //requestPermission es la funcion para disparar el dialogo nativo del sistema

 const cameraRef = useRef<CameraView>(null)

 // 1. Escenario -> el estado de permisos aun no se ha cargado
 if(!permission){
    return <View style={styles.container} />
 }

 // 2. Escenario -> Permiso denegado o no solicitado aun
 if(!permission.granted){
    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                <Ionicons name="camera-outline" size={64} color="#FF6B6B" />
                <Text style={styles.messageTitle}>Permiso de cámara requerido</Text>
                <Text style={styles.messageText} >Necesitamos acceso a tu camara para tomar fotos</Text>
                <TouchableOpacity style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}> Solicitar Permiso </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
 }

    // Alternar entre camaras
    const toggleCameraFacing = () => {
        setFacing(current => (current === "back" ? "front" : "back"))
    }

    // Funcion para tomar captura
    const takePicture = async () => {
        if(cameraRef.current){
            try {
                //takePictureAsync Captura y devuelve la direccion temporal del archivo
                const photo = await cameraRef.current.takePictureAsync({
                    quality: 0.8,// calidad del 80%
                })
                Alert.alert("Exito", `Foto tomada: ${photo.uri}`)
            } catch (error) {
                Alert.alert("Error", "No se pudo tomar la foto")
                console.log(error)
            }
        }
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                <View style={styles.controls}>
                    <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
                        <Ionicons name="camera-reverse" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                        <View style={styles.captureButtonInner} />
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  messageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  messageText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
