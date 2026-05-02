/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * Hook personalizado para obtener colores que se adaptan automáticamente al tema (claro/oscuro).
 * 
 * @param props - Permite pasar colores manuales para cada modo (opcional).
 * @param colorName - El nombre del color definido en nuestra paleta central (clase-9/constants/theme.ts).
 * 
 * @returns El color correspondiente al tema actual o el color manual si fue provisto.
 */
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // Detectamos el tema actual del sistema (o fallback a 'light')
  const theme = useColorScheme() ?? 'light';
  
  // Si se pasó un color específico por props para este tema, lo priorizamos
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    // Si no, devolvemos el color por defecto de nuestra paleta central
    return Colors[theme][colorName];
  }
}
