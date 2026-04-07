import { API_URL } from "@/constants/api"
import { Alert, Button } from "react-native"

interface FastPostButtonProps {
    onFinish?: () => void
}

export const FastPostButton = ({ onFinish }: FastPostButtonProps) => {
    const handleCreateUser = async () => {
        try {
            const nuevoUsuario = {
                name: "Alumno nuevo",
                userName: "clase_5",
                email: "alumno_nuevo@gmail.com"
            }

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {"Content-Type": 'application/json'},
                body: JSON.stringify(nuevoUsuario)
            })

            if(response.ok){
                Alert.alert('Exito!', "Usuario creado")
                if(onFinish) onFinish()
            }
        } catch (error) {
            Alert.alert('Error', "No se pudo crear")
            console.error(error)
        }
    }
    return (
        <Button title="Postear usuario rapido" color="green" onPress={handleCreateUser} />
    )
}