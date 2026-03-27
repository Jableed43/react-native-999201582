import React, { useState } from 'react';
import { Card, Switch, Snackbar, List } from 'react-native-paper';
import ScreenWrapper from '../components/ScreenWrapper';
import { sharedStyles } from '../styles/sharedStyles';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleNotificationToggle = (value: boolean) => {
    setNotifications(value);
    setSnackbarMessage(value ? 'Notificaciones activadas' : 'Notificaciones desactivadas');
    setSnackbarVisible(true);
  };

  return (
    <ScreenWrapper title="Configuración">
      <Card style={sharedStyles.card}>
        <List.Item
          title="Notificaciones"
          description="Habilitar alertas en el dispositivo"
          right={() => (
            <Switch 
              value={notifications} 
              onValueChange={handleNotificationToggle} 
            />
          )}
        />
      </Card>

      <Card style={sharedStyles.card}>
        <List.Item
          title="Privacidad"
          description="Ajustes de visibilidad de cuenta"
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => console.log('Privacidad')}
        />
      </Card>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
      >
        {snackbarMessage}
      </Snackbar>
    </ScreenWrapper>
  );
}
