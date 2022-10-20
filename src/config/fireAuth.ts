import { FIREBASE_CONFIG } from './config';
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth/react-native';

const firebaseApp = initializeApp(FIREBASE_CONFIG);

initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const fireAuth = getAuth(firebaseApp);
