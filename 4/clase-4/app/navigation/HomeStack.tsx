import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";

const Stack = createNativeStackNavigator()

export default function HomeStack() {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false, //Desactivado para evitar doble titulo junto al screenwrapper
            contentStyle:{
                backgroundColor: '#f5f5f5',
            }
        }}
        >
            <Stack.Screen
            name="Home"
            component={HomeScreen}
            />

            <Stack.Screen
            name="Details"
            component={DetailsScreen}
            />

        </Stack.Navigator>
    )
}