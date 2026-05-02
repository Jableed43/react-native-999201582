import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * Componente de diseño (Layout) para la navegación por pestañas (Tabs).
 * Expo Router utiliza este archivo para configurar la barra inferior y las opciones de pantalla comunes.
 */
export default function TabLayout() {
  const colorScheme = useColorScheme(); // Detectamos el tema para aplicar colores a la barra

  return (
    <Tabs
      screenOptions={{
        // Color de la pestaña activa basado en el tema actual
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Ocultamos el encabezado por defecto para usar SafeAreas personalizados
        headerShown: false,
      }}>
      
      {/* Definición de la pestaña principal */}
      <Tabs.Screen
        name="index" // Debe coincidir con el nombre del archivo (index.tsx)
        options={{
          title: 'TODO List',
          // Icono simple usando un Emoji para evitar dependencias externas de iconos
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>📝</Text>,
        }}
      />
    </Tabs>
  );
}
