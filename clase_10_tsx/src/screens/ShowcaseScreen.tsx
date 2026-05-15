import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import AnimatedScreen from '../components/AnimatedScreen';
import { Motion, AnimatePresence } from '@legendapp/motion'; // Librería de animación

/**
 * LABORATORIO DE ANIMACIONES
 * Props para experimentar:
 * - initial: { opacity, scale, rotate, y }
 * - animate: { opacity, scale, rotate, y }
 * - transition: { type: 'spring' | 'tween', damping, stiffness, delay }
 */
export default function ShowcaseScreen() {
  const [isVisible, setIsVisible] = useState<boolean>(true)
  // Es un estado que guarda el id de la tarjeta que el usuario presionó
  // permite controlar varios elementos y observarlos
  const [activeId, setActiveId] = useState<string | null>(null)

  // permite alternar la animacion al hacer click
  const toggle = (id: string) => {
    setActiveId(activeId === id ? null : id)
  }

  return (
    <AnimatedScreen>
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Laboratorio Interactivo</Text>
        <Text style={styles.subtitle}>Toca cada tarjeta para activar la animación</Text>

      {/* animate presence, es la gestion de entrada y salida del arbol de componentes, permite que el componente ejecute su prop "exit" antes de desaparecer */}
        <View style={styles.card}>
          <Text> Entrada y salida, animatePresence </Text>
          <AnimatePresence>
            {
              isVisible && (
                <Motion.View
                initial={{opacity: 0, scale: 0.5, rotate: "-10deg"}}
                animate={{opacity: 1, scale: 1, rotate: "0deg"}}
                exit={{ opacity: 0, scale: 0, rotate: "10deg" }}
                transition={{type: "spring", damping: 12}}
                style={styles.boxGreen}
                >
                  <Text> Hola!! </Text>
                </Motion.View>
              )
            }
          </AnimatePresence>
          <Pressable 
            onPress={() => setIsVisible(!isVisible)} 
            style={[styles.button, { marginTop: 15, backgroundColor: isVisible ? '#FF3B30' : '#4CD964' }]}
          >
            <Text style={styles.boxText}>{isVisible ? 'Eliminar' : 'Aparecer'}</Text>
          </Pressable>
        </View>

        {/* // SPRING: Fisica de rebote  */}
        <Pressable style={styles.card} onPress={() => toggle("spring")} >
            <Text> Salto con rebote </Text>
            <Motion.View
            animate={{
              y: activeId === "spring" ? -50 : 0,
              scale: activeId === "spring" ? 1.2 : 1
            }}
            // la transicion simula la fisica real, damping la resistencia, stiffness la fuerza
            transition={{ type: "spring", damping: 5, stiffness: 150 }}
            style={styles.boxBlue}
            />
        </Pressable>

                {/* 2. 3D ROTATION: Rotación en ejes espaciales */}
        <Pressable style={styles.card} onPress={() => toggle('rotate')}>
          <Text style={styles.label}>2. Rotación 3D (Eje Y)</Text>
          <Motion.View
            animate={{ rotateY: activeId === 'rotate' ? '180deg' : '0deg' }}
            transition={{ type: 'spring' }}
            style={styles.boxOrange}
          >
            <Text style={styles.boxText}>{activeId === 'rotate' ? 'ATRÁS' : 'FRENTE'}</Text>
          </Motion.View>
        </Pressable>

        {/* 3. PULSE ERROR: Animaciones de feedback de usuario */}
        <Pressable style={styles.card} onPress={() => toggle('shake')}>
          <Text style={styles.label}>3. Efecto Alerta (Pulse Error)</Text>
          <Motion.View
            animate={{ 
              scale: activeId === 'shake' ? 1.1 : 1,
              backgroundColor: activeId === 'shake' ? '#b91c1c' : '#FF3B30'
            }}
            transition={{ type: 'spring', damping: 2 }} // Damping bajo genera más "oscilación"
            style={styles.boxRed}
          >
            <Text style={styles.boxText}>ERROR</Text>
          </Motion.View>
        </Pressable>

        {/* 4. MORPHING: Cambios de forma y color */}
        <Pressable style={styles.card} onPress={() => toggle('color')}>
          <Text style={styles.label}>4. Transición de Color y Bordes</Text>
          <Motion.View
            animate={{ 
              backgroundColor: activeId === 'color' ? '#5856D6' : '#FF2D55',
              borderRadius: activeId === 'color' ? 50 : 10,
              rotate: activeId === 'color' ? '45deg' : '0deg'
            }}
            style={styles.boxGeneric}
          />
        </Pressable>
    </ScrollView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f9' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 25 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 18, marginBottom: 20, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  label: { fontSize: 15, fontWeight: '600', color: '#444', marginBottom: 20, alignSelf: 'flex-start' },
  boxBlue: { width: 70, height: 70, backgroundColor: '#007AFF', borderRadius: 15 },
  boxOrange: { width: 100, height: 60, backgroundColor: '#FF9500', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  boxRed: { width: 120, height: 50, backgroundColor: '#FF3B30', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  boxGeneric: { width: 80, height: 80, backgroundColor: '#FF2D55' },
  boxGreen: { width: 120, height: 60, backgroundColor: '#4CD964', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  boxText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  button: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }
});

