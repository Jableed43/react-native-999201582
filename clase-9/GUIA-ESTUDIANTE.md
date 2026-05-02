# 📘 Guía del Estudiante: Persistencia y Backend-as-a-Service (BaaS)

Esta guía contiene todo lo necesario para replicar lo visto en nuestra **Clase 09**. En esta sesión, trabajamos sobre el proyecto **"TODO List"**, donde aprendimos a conectar los "cables" de la lógica usando **AsyncStorage** para datos locales y **Firebase Firestore** para sincronización en la nube.

---

## 1. 🔥 Introducción a Firebase
**Firebase** es una plataforma de Google que nos permite crear aplicaciones potentes sin necesidad de programar nuestro propio servidor (Backend).

### ¿Por qué lo usamos?
- **Cloud Firestore**: Es una base de datos NoSQL que se actualiza sola en todos los teléfonos conectados (Tiempo Real).
- **Escalable**: Funciona igual de bien para 10 que para 10.000 usuarios.
- **Gratis**: Tiene un plan gratuito muy generoso para aprender.

---

## 📍 Resumen de lo logrado en la Clase 09
Hoy transformamos una UI estática en una aplicación **FullStack real**. El proyecto **"TODO List Sync"** ahora es capaz de:
1.  **Recordar quién eres**: Gracias a `AsyncStorage`, la app no olvida tu nombre al cerrarse.
2.  **Sincronización Total**: Si agregas una nota en la Web, aparece en tu Android al instante gracias a `onSnapshot`.
3.  **Persistencia Híbrida**: Combinamos velocidad local con respaldo en la nube.

---

## 2. 🛠️ ¿Cómo incluir esto en mi propio proyecto?

Si ya tienes un proyecto de React Native/Expo y quieres añadirle estas funciones, sigue estos pasos:

### Paso A: Instalar las librerías
Ejecuta estos comandos en la terminal de tu proyecto:
```bash
# Para persistencia local
npx expo install @react-native-async-storage/async-storage

# Para persistencia en la nube
npm install firebase

# Tipos para evitar errores de TypeScript (Recomendado)
npm install -D @types/node
```

### Paso B: Configuración de Firebase
1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com).
2. Crea una **App Web** y copia el objeto `firebaseConfig`.
3. Crea un archivo `.env` en la raíz de tu proyecto y pega tus llaves (mira el ejemplo de clase).
4. Crea la carpeta `config/` y dentro el archivo `firebaseConfig.ts`.

---

## 3. 💾 Persistencia Local (AsyncStorage)

Lo usamos para datos que pertenecen **solo al dueño del teléfono** (ej: su nombre, si prefiere modo oscuro, etc.).

### Machete de AsyncStorage:
```tsx
// 1. Guardar datos
await AsyncStorage.setItem('@mi_app:clave', 'valor');

// 2. Leer datos
const valor = await AsyncStorage.getItem('@mi_app:clave');

// 3. Borrar datos
await AsyncStorage.removeItem('@mi_app:clave');
```

---

## 4. ☁️ Persistencia Cloud (Firestore)

Lo usamos para datos que deben estar **disponibles en cualquier dispositivo** o compartidos.

### Machete de Firestore (CRUD):

#### 📡 Leer en tiempo real (Suscripción)
```tsx
useEffect(() => {
  const q = query(collection(db, 'mi_coleccion'));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMiEstado(data);
  });
  return () => unsubscribe(); // ¡IMPORTANTE: Siempre limpiar!
}, []);
```

#### ✍️ Crear un nuevo documento
```tsx
await addDoc(collection(db, 'mi_coleccion'), {
  texto: "Nueva nota",
  fecha: new Date(),
});
```

#### ✏️ Actualizar un documento
```tsx
await updateDoc(doc(db, 'mi_coleccion', id), {
  completado: true
});
```

#### 🗑️ Eliminar un documento
```tsx
await deleteDoc(doc(db, 'mi_coleccion', id));
```

---

## 🆘 Troubleshooting (¿Qué hago si no funciona?)

1. **"Firebase: Error (auth/invalid-api-key)"**:
   - Revisa tu archivo `.env`. Asegúrate de que no haya espacios extra y que las llaves sean exactas.
2. **"AsyncStorage is null"**:
   - Detén la terminal y vuelve a ejecutar `npx expo start -c`.
3. **"Firestore: Missing or insufficient permissions"**:
   - Ve a la pestaña **Rules** en tu consola de Firebase y asegúrate de que permitan lectura y escritura:
     `allow read, write: if true;` (Solo para desarrollo).

---

## 🎯 Resumen para replicar el proyecto de clase
1. **Paso 1:** Configura tu `.env` con las credenciales de Firebase.
2. **Paso 2:** En el `index.tsx`, implementa el `handleLogin` usando `AsyncStorage`.
3. **Paso 3:** Implementa la carga inicial (Hydration) con un `useEffect`.
4. **Paso 4:** Conecta el `onSnapshot` de Firestore para ver las notas aparecer por arte de magia.
5. **Paso 5:** Programa los botones de "Agregar" y "Eliminar".
