import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { sharedStyles } from "../styles/sharedStyles";
import { Text } from 'react-native-paper'

interface ScreenWrapperProps {
    children: React.ReactNode;
    title?: string;
    withScroll?: boolean;
}

/* Finalidad del screenwrapper -> unitifa la estructura de todas las pantallas
    - Maneja el safeAreaView con los bordes correctos
    - centraliza el padding y el fondo
    - opcionalmente renderiza un titulo standar
*/

export default function ScreenWrapper({ children, title, withScroll = false }: ScreenWrapperProps){
    const Container = withScroll ? ScrollView : View;

    return (
        <SafeAreaView style={sharedStyles.screen}
        edges={['bottom', 'left', 'right']} >
            <Container style={sharedStyles.content}>
                { title && (
                  <Text style={sharedStyles.title}>
                    {title}
                  </Text>  
                ) }
                { children }
            </Container>
        </SafeAreaView>
    )
}