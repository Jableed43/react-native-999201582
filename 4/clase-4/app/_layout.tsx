import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

// Pantallas importadas (Navegador principal)
import TabNavigator from "./navigation/TabNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={MD3LightTheme}>
        <StatusBar style="dark" />
        <TabNavigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
