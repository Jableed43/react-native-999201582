import { darkColors, lightColors } from "@/constants/theme";
import { createContext, ReactNode, useContext, useState } from "react";

// Definimos las opciones de temas
export type Theme = 'light' | 'dark'

// Generamos el tipo del contexto
interface ThemeContextType{
    theme: Theme;
    colors: typeof lightColors;
    toggleTheme: () => void;
}

// Creamos el contexto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({children}:{children: ReactNode}){
    const [theme, setTheme] = useState<Theme>('light')

    const toggleTheme = () => {
        setTheme(prev => prev === "light" ? "dark" : "light")
    }
    const colors = theme === "light" ? lightColors : darkColors;

    return (
        <ThemeContext.Provider value={{theme, colors, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme(){
    const context = useContext(ThemeContext)
    if(context === undefined){
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}