import React from "react";
import { Motion } from "@legendapp/motion"

interface AnimatedScreenProps {
  children: React.ReactNode;
}
// Sirve como un envoltio que le da transicion suave a cualquier pantalla de la app
// Evita que las pantallas salten brucamente

export default function AnimatedScreen({ children }: AnimatedScreenProps) {
  // Aquí envolveremos el contenido con Motion.View para animar transiciones de pantalla
  return (
  <Motion.View style={{ flex: 1 }}
  initial={{ opacity: 0, y: 10  }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10  }}
  transition={{ duration: 400, type: "tween" }}
  >
    {children}
  </Motion.View>);
}
