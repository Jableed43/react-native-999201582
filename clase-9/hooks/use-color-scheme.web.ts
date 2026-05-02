import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
/**
 * Versión específica para WEB del hook useColorScheme.
 * 
 * En la web, durante el renderizado estático (SSR), no sabemos el esquema de colores del usuario.
 * Por eso, esperamos a que el componente se "hidrate" (se monte en el cliente) antes de
 * devolver el valor real, evitando discrepancias entre el servidor y el cliente.
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    // Se ejecuta solo una vez cuando el componente se monta en el navegador
    setHasHydrated(true);
  }, []);

  const colorScheme = useRNColorScheme();

  // Si ya estamos en el cliente, devolvemos el esquema real
  if (hasHydrated) {
    return colorScheme;
  }

  // Fallback seguro para el renderizado inicial en servidor
  return 'light';
}
