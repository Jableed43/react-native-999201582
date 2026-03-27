## Proyecto Práctico: App con Navegación {#proyecto-práctico-app-con-navegación}

### Objetivo

Construir una aplicación con navegación completa que demuestre el uso de Stack Navigator, Tab Navigator y los principios de Material Design de forma práctica.

### Componentes/Conceptos a Aplicar

- **Stack Navigator**: Navegación entre pantallas en flujo lineal
- **Tab Navigator**: Navegación principal por pestañas
- **React Native Paper**: Componentes Material Design
- **Paso de parámetros**: Enviar datos entre pantallas
- **Navegación anidada**: Combinar diferentes tipos de navegadores

### Pasos Generales para Construir la Aplicación

1. **Inicializar proyecto**: Crear proyecto Expo con `npx create-expo-app AppNavegacion`
2. **Instalar dependencias**: Instalar todos los paquetes en un solo comando `npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-gesture-handler react-native-safe-area-context react-native-reanimated react-native-paper @expo/vector-icons expo-status-bar`
3. **Crear estructura de carpetas**: Organizar `context/`, `navigation/`, `screens/`, `styles/`, `theme/`
4. **Crear estilos compartidos**: Implementar `sharedStyles.ts` con estilos reutilizables
5. **Crear tema Material Design**: Configurar temas claro y oscuro en `theme/theme.ts`
6. **Crear Context de tema**: Implementar `ThemeContext.tsx` para manejo global del tema
7. **Configurar layout principal**: Configurar `_layout.tsx` con `SafeAreaProvider`, `ThemeProvider` y `PaperProvider`
8. **Configurar StatusBar**: Agregar `StatusBar` dentro de `PaperProvider` con adaptación al tema
9. **Crear Stack Navigator**: Implementar navegación tipo pila para flujos lineales
10. **Crear Tab Navigator**: Implementar navegación por pestañas para secciones principales
11. **Crear pantallas básicas**: Home, Perfil, Detalles, Configuración con `SafeAreaView` y `edges`
12. **Implementar paso de parámetros**: Enviar datos entre pantallas (ej: de lista a detalle)
13. **Integrar React Native Paper**: Agregar componentes Material Design (Button, Card, FAB)
14. **Aplicar estilos compartidos**: Usar `cardStyle` y `sharedStyles` en todas las pantallas
15. **Implementar navegación anidada**: Combinar Stack dentro de Tabs
16. **Agregar gestos y animaciones**: Verificar que los gestos nativos funcionen
17. **Aplicar estilos Material Design**: Usar elevación, espaciado en múltiplos de 8px y jerarquía visual
18. **Verificar funcionalidad**: Probar navegación entre todas las pantallas y toggle de tema

### Conceptos Aplicados

- **Navegación declarativa**: Configurar navegadores con componentes
- **Stack Navigator**: Flujos lineales y navegación profunda
- **Tab Navigator**: Navegación horizontal entre secciones
- **Paso de parámetros**: Enviar y recibir datos entre pantallas
- **Navegación anidada**: Combinar diferentes tipos de navegadores
- **Material Design 3**: Aplicar principios de diseño visual
- **React Native Paper**: Usar componentes Material Design
- **Estilos compartidos**: Reutilización de código y consistencia visual
- **Context API**: Manejo global del estado del tema
- **SafeAreaView**: Respetar áreas seguras del dispositivo
- **StatusBar**: Adaptación de la barra de estado al tema

### Resultado Final

Una aplicación funcional que permite:
- Navegar entre diferentes secciones usando Tabs
- Navegar a pantallas de detalle usando Stack
- Ver información pasada entre pantallas
- Interactuar con componentes Material Design
- Experimentar con gestos nativos de navegación

---

## Buenas Prácticas {#buenas-prácticas}

### Navegación

- ✅ **Usa Stack para flujos lineales**: Formularios, detalles, procesos paso a paso
- ✅ **Usa Tabs para secciones principales**: Home, Perfil, Búsqueda, etc.
- ✅ **Usa Drawer para opciones secundarias**: Configuraciones, menús laterales
- ✅ **Combina navegadores cuando sea necesario**: Stack dentro de Tabs es común
- ✅ **Pasa parámetros de forma tipada**: Usa TypeScript para type safety
- ❌ **Evita anidar demasiado**: Máximo 2-3 niveles de anidación
- ❌ **No uses navegación innecesaria**: Cada pantalla debe tener un propósito claro

### Material Design

- ✅ **Sigue la jerarquía visual**: Usa tamaño, color y espaciado para importancia
- ✅ **Usa componentes reconocibles**: Cards, FAB, Buttons de Material Design
- ✅ **Aplica feedback visual**: Respuesta inmediata a interacciones
- ✅ **Mantén consistencia**: Mismo estilo en toda la aplicación
- ✅ **Usa elevación apropiada**: Sombras para crear profundidad
- ✅ **Usa espaciado en múltiplos de 8px**: 8, 16, 24, 32 para consistencia
- ✅ **Crea estilos compartidos**: Reutiliza código y mantén consistencia
- ✅ **Configura StatusBar correctamente**: Dentro de PaperProvider y adaptado al tema
- ✅ **Usa SafeAreaView con edges**: Excluye 'top' para evitar conflictos con StatusBar
- ❌ **No satures la UI**: Deja espacio en blanco para respiración visual
- ❌ **No mezcles estilos**: Mantén un sistema de diseño consistente
- ❌ **No olvides el Context**: Usa Context API para tema global, no prop drilling

---

## Resumen y Recursos {#resumen-y-recursos}

### Conceptos Clave Aprendidos

1. **React Navigation**: Sistema de navegación estándar para React Native
2. **Stack Navigator**: Para flujos lineales y navegación profunda
3. **Tab Navigator**: Para navegación horizontal entre secciones principales
4. **Drawer Navigator**: Para menús laterales y opciones secundarias
5. **Material Design 3**: Guía de diseño para interfaces coherentes
6. **React Native Paper**: Librería de componentes Material Design para React Native
7. **Estilos Compartidos**: Reutilización de código y mantenimiento de consistencia visual
8. **Context API**: Manejo global del estado (tema claro/oscuro)
9. **SafeAreaView**: Respeto de áreas seguras del dispositivo
10. **StatusBar**: Configuración adaptativa según el tema de la aplicación

### Recursos Oficiales

- **React Navigation:** https://reactnavigation.org/docs/getting-started
- **React Native Paper:** https://callstack.github.io/react-native-paper/
- **Material Design 3:** https://m3.material.io/
- **Expo Router (alternativa):** https://docs.expo.dev/guides/routing/
