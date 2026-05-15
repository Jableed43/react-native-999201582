# 🛡️ Guía de Supervivencia: Estabilidad en Proyectos React Native (Versión Definitiva)

¡Bienvenido al desarrollo móvil! Esta guía condensa horas de resolución de problemas reales. Úsala cuando tu app "explote" o el emulador no coopera.

## 1. La Regla de Oro: Estabilidad sobre Novedad
Nunca uses la última versión de Expo para aprender o para producción inmediata. Aunque existan versiones más nuevas (como la 54), usa siempre la versión **LTS (SDK 52)** por temas de compatibilidad.

**Comando para crear un proyecto estable y profesional (TS):**
```bash
npx create-expo-app NombreApp --template blank-typescript@sdk-52
```

---

## 2. Los Culpables de las "Pantallas Rojas"

### A. La Nueva Arquitectura (New Architecture)
Si ves errores de `NullPointerException` o `initHybrid` al arrancar:
*   **Causa:** Incompatibilidad de librerías de gestos con el nuevo motor de React Native.
*   **Solución:** Ve a `app.json` y asegúrate de que esté desactivado (o verificado como compatible):
    ```json
    "newArchEnabled": false
    ```

> **¿Qué es la "New Architecture"?**  
> Es una reescritura total del motor de React Native (Fabric y TurboModules). Aunque promete mayor velocidad y mejor comunicación con el código nativo, muchas librerías de terceros aún no son 100% estables con ella. Para aprender y asegurar que tu código funcione a la primera, **recomendamos mantenerla bajo control (preferentemente en SDK 52)**.


### B. Dependencias "Ocultas" (SDK 52)
A veces, al instalar iconos o librerías de terceros, faltan paquetes base de Expo que no se instalan por defecto en los templates "blank".
*   **Error común:** `Unable to resolve expo-font`, `expo-asset` o problemas con iconos.
*   **Comando de Fix Total:**
    ```bash
    npx expo install expo-font expo-asset expo-constants expo-modules-core
    ```

---

## 3. El Ritual de Limpieza (Troubleshooting)
Si el código está bien pero la app falla "porque sí":

1.  **Cerrar Metro Bundler** (Ctrl+C).
2.  **Limpia la Caché de Metro:**
    ```bash
    npx expo start -c
    ```
3.  **Borrado Extremo (Windows PowerShell):**
    Si nada funciona, borra todo lo generado y reinstala:
    ```powershell
    Remove-Item -Path .expo, node_modules, package-lock.json -Recycle -Force
    npm install
    ```

---

## 4. Problemas con el Emulador Android

### A. Error de Espacio (`INSUFFICIENT_STORAGE`)
Si al intentar actualizar Expo Go el emulador falla:
*   **Causa:** El emulador tiene mucha basura acumulada de versiones viejas.
*   **Solución:** Cierra el emulador, ve al **Device Manager** de Android Studio, haz clic en los tres puntitos (⋮) del dispositivo y selecciona **"Wipe Data"**.

### B. Conflicto de Versión de Expo Go
Si ves el error *"Project is incompatible with this version of Expo Go"*:
*   **Solución:** Al ejecutar `npx expo start --android`, Expo te preguntará si quieres instalar la versión recomendada. Presiona **`Y`** (Sí). 

---

## 5. Errores "Fantasma" de TypeScript (Cannot find module)
A veces, después de crear archivos nuevos o instalar librerías, VS Code sigue marcando errores en rojo aunque el archivo exista y la ruta sea correcta.

*   **Causa:** El servidor de TypeScript de VS Code no se ha enterado de los cambios en el sistema de archivos.
*   **Solución:** Reinicia el servidor de TS:
    1. Presiona `Ctrl + Shift + P` (Windows) o `Cmd + Shift + P` (Mac).
    2. Escribe **`TypeScript: Restart TS Server`** y presiona Enter.

---

## 💡 Mantra del Desarrollador Mobile
Como desarrollador, tu trabajo no es solo escribir código, sino gestionar tu entorno. Si una librería te da problemas en la versión más nueva, **no dudes en bajar de versión (downgrade)** a una que sepas que es estable.

> *"No es tu código, es el entorno. Mantén la calma, limpia la caché y usa versiones estables. Un código simple que funciona es mil veces mejor que un código moderno que no arranca."*

---

**Última actualización:** Mayo 2026 - Material de Apoyo UTN.
