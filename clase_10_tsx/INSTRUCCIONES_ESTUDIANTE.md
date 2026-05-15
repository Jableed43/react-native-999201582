# 🚀 Hoja de Ruta Estudiantil: Construyendo "Motion Vault"

¡Bienvenido! Estás frente al código base de nuestra aplicación. Este proyecto ya tiene la "fontanería" lista (librerías instaladas y configuradas) para que te enfoques en lo más divertido: **Navegación y Animaciones**.

---

## 🧠 ¿Qué cambió desde la Clase 3?
En la Clase 3, aprendimos a "simular" navegación usando **Estados (`useState`)**.
*   **Antes (Clase 3):** Era una solución manual, sin historial ni gestos nativos.
*   **Ahora (Clase 10):** Usamos **React Navigation**. Es el estándar industrial. Gestiona la memoria, permite gestos nativos y maneja rutas complejas automáticamente.

---

## 🛠️ Fase 1: Estructura de Navegación

### 1.1 Las Pestañas (Tabs)
*   **Archivo:** `src/navigation/TabNavigator.tsx`
*   **Misión:** Importar `createBottomTabNavigator` y configurar los iconos.
*   **Iconos sugeridos:** `folder` para archivos y `settings` para ajustes.

### 1.2 El Menú Lateral (Drawer)
*   **Archivo:** `src/navigation/MainNavigator.tsx`
*   **Misión:** Crear el "Contenedor Raíz" e implementar la **Navegación Anidada**, poniendo el `TabNavigator` dentro del Drawer.
*   **Iconos sugeridos:** `home-outline`, `flask-outline` (para el laboratorio) y `person-outline`.

---

## ✨ Fase 2: El Poder de las Animaciones

### 2.1 Transiciones de Pantalla
*   **Archivo:** `src/components/AnimatedScreen.tsx`
*   **Misión:** Envolver el contenido con `Motion.View`. Usa `initial={{ opacity: 0 }}` y `animate={{ opacity: 1 }}` para que el cambio de pantallas sea suave.

### 2.2 El Laboratorio Interactivo
*   **Archivo:** `src/screens/ShowcaseScreen.tsx`
*   **Misión:** Experimentar con las propiedades de `Motion`.
    1.  Crea un elemento que reaccione al toque: `whileTap={{ scale: 0.9 }}`.
    2.  Usa un estado `activeId` para disparar cambios de color o rotaciones al hacer click.

### 2.3 Presencia y Salida (AnimatePresence)
*   **Archivo:** `src/screens/ShowcaseScreen.tsx`
*   **Misión:** ¡Anima elementos que desaparecen! Envuélvelos en `<AnimatePresence>` y define la propiedad `exit`. Sin esto, el elemento desaparece de golpe sin terminar su animación.

### 2.4 El Gran Final: Efecto Cascada (Stagger)
*   **Archivo:** `src/components/FileCard.tsx`
*   **Misión:** En `HomeScreen.tsx`, pasa el `index` de la lista al componente `FileCard`. En la tarjeta, usa ese índice para el retraso: `transition={{ delay: index * 0.1 }}`.

---

## 📝 Mini-Glosario "Legend Motion"
| Propiedad | Qué hace | Ejemplo |
| :--- | :--- | :--- |
| **initial** | Estado inicial (antes de aparecer) | `{ opacity: 0, y: 20 }` |
| **animate** | Estado final deseado | `{ opacity: 1, y: 0 }` |
| **exit** | Estado al ser eliminado (requiere AnimatePresence) | `{ scale: 0 }` |
| **transition** | Cómo se mueve (tipo, duración, delay) | `{ type: 'spring', damping: 10 }` |
| **whileTap** | Animación mientras se presiona | `{ scale: 0.95 }` |

---

## 🆘 Guía Visual de Errores (¿Qué hago si...?)
| Si ves esto... | Haz esto... |
| :--- | :--- |
| **"Module not found"** | `Ctrl+Shift+P` -> `Restart TS Server`. |
| **Error de Gesture Handler** | Revisa que el import esté en la línea 1 de `App.tsx`. |
| **No se ve el Drawer** | Revisa si envolvieron todo en un `NavigationContainer` en `App.tsx`. |

---

**💡 Pro-tip:** Si te trabas, recuerda el mantra: *"La mejor forma de aprender es rompiendo cosas"*.

---

## 📦 Apéndice: Instalación desde Cero
Si quieres replicar este proyecto en casa, estos son los comandos que ya vienen aplicados en este Starter Kit:

```bash
# 1. Navegación (Core y Navegadores)
npx expo install @react-navigation/native @react-navigation/drawer @react-navigation/bottom-tabs

# 2. Dependencias nativas obligatorias
npx expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context

# 3. Motor de Animaciones
npm install @legendapp/motion
```

**Material de Apoyo - UTN 2026**
