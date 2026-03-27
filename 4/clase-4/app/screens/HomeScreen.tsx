import { useState } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import { FlatList, StyleSheet } from "react-native";
import { Card, FAB, Text } from "react-native-paper";
import { sharedStyles } from "../styles/sharedStyles";

interface Item {
    id: number;
    title: string;
    description: string;
}

/**
 * HomeScreen: Componente de pantalla que recibe props automáticamente de React Navigation.
 * 
 * @param navigation - Extraemos (destructuring) el objeto que nos permite navegar.
 */
export default function HomeScreen({ navigation }: any) {
    // El item va a ser un elemento que se va a multiplicar y va a contener texto
    // Nos va a permitir navegar a los detalles del item
    // Esto podria representar productos, posteos o cualquier cosa a la cual puedas navegar internamente
    // useState nos permite manejar el estado interno del componente.
    // Aquí definimos una lista de items que se mostrarán en la pantalla principal.
    // En una app real, estos datos podrían venir de una base de datos o API.
    const [items] = useState<Item[]>([
        { id: 1, title: "Item 1", description: "Descripción del item 1" },
        { id: 2, title: "Item 2", description: "Descripción del item 2" },
        { id: 3, title: "Item 3", description: "Descripción del item 3" },
    ])

    /**
     * Función renderItem: Define cómo se verá cada elemento de la lista.
     * @param item - El objeto individual de la lista 'items'
     * 
     * navigation.navigate("Details", {item}):
     * - "Details" es el nombre de la ruta a la que queremos ir (definida en el Stack.Navigator).
     * - {item} es el segundo argumento: un objeto que contiene los datos que pasamos a la siguiente pantalla.
     */
    const renderItem = ({item}: {item: Item}) => (
        <Card style={sharedStyles.card} onPress={() => navigation.navigate("Details", {item})}>
            <Card.Content>
                <Text style={styles.itemTitle}> {item.title} </Text>
                <Text variant="bodyMedium" > {item.description} </Text>
            </Card.Content>
        </Card>
    )

    return (
        <ScreenWrapper title="Lista de items">
            <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            />
            <FAB icon="plus" style={sharedStyles.fab} onPress={() => console.log('nuevo item')} />
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: '#1d1b20'
  }
});
