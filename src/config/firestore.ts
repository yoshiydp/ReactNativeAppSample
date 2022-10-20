import { FIREBASE_CONFIG } from './config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(FIREBASE_CONFIG)
  : firebase.app()

const db = firebaseApp.firestore();

export default db
