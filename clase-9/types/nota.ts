/**
 * Definición de la estructura de una Nota.
 * Se utiliza en toda la aplicación para garantizar la consistencia de los datos.
 */
export interface Nota {
  id: string;          // Identificador único generado por Firestore
  nombre: string;      // Nombre del usuario que creó la nota
  descripcion: string; // El contenido de la tarea
  estado: boolean;     // true si está completada, false si está pendiente
}
