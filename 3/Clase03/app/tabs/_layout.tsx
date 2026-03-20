import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
       /* Se vincula automáticamente con el archivo 'index.tsx' */
        name="index"
        options={{
          title: 'Tareas',
          tabBarIcon: () => <Text>📋</Text>,
        }}
      />
      <Tabs.Screen
      /* Se vincula automáticamente con el archivo 'theme.tsx' */
        name="theme"
        options={{
          title: 'Tema',
          tabBarIcon: () => <Text>🌙</Text>,
        }}
      />
    </Tabs>
  );
}
