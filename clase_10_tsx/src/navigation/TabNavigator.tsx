import React from 'react';
// Aquí importaremos createBottomTabNavigator en clase
// Iconos sugeridos (Ionicons): 'folder', 'settings'
import {  createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons'
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator()

// Pantalla temporal
const SettingsPlaceHolder = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Ajustes de la app</Text>
  </View>
)

export default function TabNavigator() {
  // Aquí definiremos las pestañas de la aplicación

  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#007AFF",
      tabBarInactiveTintColor: "#8e8e93",
      tabBarStyle: {height: 60, paddingBottom: 10}
    }}
    >
      <Tab.Screen 
      name='Files'
      component={HomeScreen}
      options={{
        tabBarLabel: "Archivos",
        tabBarBadge: 3,
        tabBarIcon: ({ color, size }) => <Ionicons name="folder" color={color} size={size} />
      }}
      />
      <Tab.Screen 
      name='Setings'
      component={SettingsPlaceHolder}
      options={{
        tabBarLabel: "Ajustes",
        tabBarIcon: ({ color, size }) => <Ionicons name="settings" color={color} size={size}/>
      }}
      />
    </Tab.Navigator>
  )
}
