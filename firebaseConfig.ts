import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, connectAuthEmulator, Auth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator, Firestore } from "firebase/firestore";
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || Constants.expoConfig?.extra?.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID || Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID || Constants.expoConfig?.extra?.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || Constants.expoConfig?.extra?.FIREBASE_MEASUREMENT_ID,
};

if (!firebaseConfig.projectId) {
  throw new Error("CRITICAL: Firebase projectId is missing. Check your environment variables or app.config.js/ts.");
}

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

console.log(`Firebase initialized with projectId: ${firebaseConfig.projectId}`);

if (process.env.NODE_ENV === 'test') {
  console.log("Connecting to Firebase Emulators...");
  try {
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectAuthEmulator(auth, 'http://localhost:9099');
    console.log("Successfully connected to emulators.");
  } catch (error) {
    console.error("Error connecting to emulators:", error);
  }
}

export { app as fbApp, auth, db };
