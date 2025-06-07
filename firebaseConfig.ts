// firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "emulator-api-key",
  authDomain: "localhost",
  projectId: "emulator-id",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
connectFirestoreEmulator(db, "localhost", 8080);

const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099");

export { app, db, auth };
