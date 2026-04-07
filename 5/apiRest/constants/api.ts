import { Platform } from 'react-native';

// Tu IP local detectada para que funcione en dispositivos físicos
const IP_LOCAL = '192.168.1.33'; 

const BASE_URL = Platform.OS === 'android' 
  ? `http://${IP_LOCAL}:3000` 
  : `http://localhost:3000`;

export const API_URL = `${BASE_URL}/users`;
