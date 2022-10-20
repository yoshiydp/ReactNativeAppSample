import { FIREBASE_CONFIG } from './config';
import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";

const firebaseApp = initializeApp(FIREBASE_CONFIG);

export const storage = getStorage(firebaseApp);
