# Proyecto Clase 9: Persistencia con AsyncStorage y Firestore (Starter Kit)

## 📋 Descripción
Este es el proyecto base para la Clase 09. Contiene toda la interfaz visual y estilos ya configurados, pero la lógica de persistencia está vacía para ser completada durante la clase.

## 🚀 Configuración Inicial

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Firebase
Abre el archivo `.env` y completa con tus credenciales de Firebase Console.

### 3. Iniciar el Proyecto
```bash
npx expo start
```

## 🎯 Desafíos de Clase

### Desafío 1: Persistencia Local (AsyncStorage)
- Completar `handleLogin` para guardar el nombre.
- Recuperar el nombre al iniciar la app (`useEffect` en `App`).
- Implementar el guardado de la preferencia de Modo Oscuro.

### Desafío 2: Persistencia Cloud (Firestore)
- Configurar el listener `onSnapshot` para ver las notas en tiempo real.
- Implementar la función `agregarNota` usando `addDoc`.
- Implementar `toggleNota` y `eliminarNota`.

---
¡Mucha suerte en la clase! 🚀
