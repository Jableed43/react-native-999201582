import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

function RootLayoutNav() {
    const { theme } = useTheme()

    return (
        <>
        {/* Sin screenOptions={{ headerShown: false }} no se veria la barra de estado del telefono */}
            <Stack screenOptions={{ headerShown: false }} >
                <Stack.Screen name='index' />
            </Stack>
            <StatusBar style={theme === 'light' ? "dark" : "light"} />
        </>
    )
}

export default function RootLayout() {
    return (
        <ThemeProvider>
            <RootLayoutNav/>
        </ThemeProvider>
    )
}