import { firebaseConfig } from "./index";
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from "firebase/auth/react-native";

const firebaseApp = initializeApp(firebaseConfig);

initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const firebaseAuth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
