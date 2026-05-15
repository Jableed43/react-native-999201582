import React from 'react';
import { View } from 'react-native';

interface AnimatedScreenProps {
  children: React.ReactNode;
}

export default function AnimatedScreen({ children }: AnimatedScreenProps) {
  // Aquí envolveremos el contenido con Motion.View para animar transiciones de pantalla
  return <View style={{ flex: 1 }}>{children}</View>;
}
