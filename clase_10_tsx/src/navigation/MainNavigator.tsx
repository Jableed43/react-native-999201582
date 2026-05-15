import React, { useState } from 'react';
// Aquí importaremos createDrawerNavigator y los componentes necesarios en clase
// Iconos sugeridos (Ionicons): 'home-outline', 'flask-outline', 'person-outline'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'
import TabNavigator from './TabNavigator';
import ShowcaseScreen from '../screens/ShowcaseScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../../auth/LoginScreen';


const Drawer = createDrawerNavigator()

export default function MainNavigator() {
  // Aquí construiremos el Drawer y anidaremos los Tabs
  const [user, setUser] = useState<any>(null);

  if (!user) {
    return <LoginScreen onLogin={() => setUser({ name: 'Profe UTN', role: 'admin' })} />;
  }

  // llegamos hasta acá, falta cierre de sesion y reorganizacion

  return (
    <Drawer.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: "#007AFF"},
      headerTintColor: "#fff",
      drawerActiveTintColor: "#007AFF",
      drawerLabelStyle: {fontWeight: "bold"}
    }}>

    <Drawer.Screen
      name='App'
      component={TabNavigator}
      options={{
        title: "Motion Vault",
        drawerLabel: "Inicio",
        drawerIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />
      }}
    />

    <Drawer.Screen
      name='Showcase'
      component={ShowcaseScreen}
      options={{
        title: "Laboratorio",
        drawerLabel: "Animaciones",
        drawerIcon: ({ color, size }) => <Ionicons name="flask-outline" color={color} size={size} />
      }}
    />

      <Drawer.Screen
      name='Profile'
      component={ProfileScreen}
      options={{
        title: "Mi Perfil",
        drawerLabel: "Perfil",
        drawerIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} />
      }}
    />

    </Drawer.Navigator>
  )
}
