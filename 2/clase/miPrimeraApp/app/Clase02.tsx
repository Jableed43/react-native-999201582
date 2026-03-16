import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

interface Clase02Props {
    nombre: string
}

function Clase02({nombre}: Clase02Props) {
    
  return (
    <View style={styles.container} onLayout={(event) => console.log('Ancho:', event.nativeEvent.layout.width)} >
        <Text>Hola mundo</Text>
        <View style={ [styles.box ,{ backgroundColor: "red"}]}></View>
        <View style={ [styles.box ,{ backgroundColor: "blue"}]}></View>
        <Text>Este es el loro de {nombre}</Text>
        <Image source={require("../assets/images/loro.webp")} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: 20,
        borderWidth: 2
    },
    box: {
        width: 50,
        height: 50
    }
})

export default Clase02