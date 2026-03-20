## Proyecto Práctico: TODO List {#proyecto-práctico-todo-list}

Vamos a construir una aplicación TODO List completa que integre los conceptos aprendidos: estados, eventos, renderizado condicional y ciclo de renderizado.

**Comandos Iniciales:**
- Crear Proyecto: `npx create-expo-app Clase03`
- Limpiar proyecto: `npm run reset-project`
Selecciona la opcion "no"
- Instalar Dependencias: `npx expo install react-native-safe-area-context`
- Iniciar Proyecto: `npm start`
- Escribir el codigo dentro del index.tsx dentro de ./app
- No hace falta crear tabs

### Estructura del Proyecto

La aplicación tendrá las siguientes funcionalidades:
- ✅ Agregar nueva tarea
- ✅ Marcar tarea como completada (Tachar)
- ✅ Eliminar tarea
- ✅ Contar tareas pendientes en tiempo real

### Conceptos Clave a Aplicar

Este proyecto refleja fielmente la implementación en `TodoList.tsx`:

- **Estados con useState**: Manejo de `tareas` (array) y `nuevaTarea` (string).
- **Eventos**: `onPress` (botones y checkboxes), `onChangeText` (input) y `onSubmitEditing` (tecla Enter).
- **Valores Derivados**: Cálculo de `tareasPendientes` filtrando el array original sin crear un nuevo estado.
- **Actualización Inmutable**: Uso de spread operator (`[...]`), `.map()` para editar y `.filter()` para eliminar.

### Pasos para Construir la TODO List

1.  **Definir Interface**: Crear interface `Tarea` con `id`, `texto` y `completada`.
2.  **Estados Iniciales**:
    *   `tareas`: `useState<Tarea[]>([])`
    *   `nuevaTarea`: `useState("")`
3.  **Función Agregar**: Validar con `.trim()`, crear objeto con `Date.now()` como ID y actualizar con `setTareas([...tareas, nueva])`.
4.  **Input Controlado**: Vincular `value` y `onChangeText` al estado `nuevaTarea`.
5.  **Contador de Pendientes**: Calcular la longitud de las tareas no completadas.
6.  **Función Toggle**: Buscar por ID y retornar un nuevo objeto con `completada` invertido usando `.map()`.
7.  **Función Eliminar**: Filtrar el array para excluir el ID seleccionado usando `.filter()`.
8.  **Renderizado (FlatList)**:
    *   `data`: El array de tareas.
    *   `keyExtractor`: Usar el `id` (debe ser string).
    *   `renderItem`: Función que dibuja el checkbox, el texto y el icono de borrar.

### Flujo de Eventos

1.  **Escritura**: `onChangeText` actualiza el estado temporal.
2.  **Confirmación**: `onPress` o `onSubmitEditing` dispara el guardado, limpia el input y re-renderiza la lista.
3.  **Interacción**: Al tocar una tarea, `onPress` dispara `toggleTarea`, lo que cambia visualmente el checkbox y tacha el texto.
4.  **Borrado**: Al tocar el icono de tachito, `eliminarTarea` remueve el item y actualiza el contador.

---

## Buenas Prácticas Aplicadas

### 1. Keys Únicas
Siempre usamos `item.id` en el `keyExtractor` para evitar problemas de rendimiento y bugs visuales al reordenar o eliminar elementos.

### 2. Evitar Mutaciones
En lugar de `tareas.push()`, siempre creamos copias nuevas:
```tsx
// ✅ Correcto (React detecta el cambio)
setTareas([...tareas, nueva]);

// ❌ Incorrecto (React no re-renderiza)
tareas.push(nueva);
```

### 3. Valores Derivados
No creamos un estado `const [pendientes, setPendientes] = useState(0)`. Es mejor calcularlo directamente:
```tsx
const tareasPendientes = tareas.filter(t => !t.completada).length;
```
Esto garantiza que el contador nunca esté "desincronizado" del estado real de la lista.

### 4. Componente Seguro
Usamos `SafeAreaView` de `react-native-safe-area-context` para que la app sea compatible con dispositivos con Notch (muesca).
