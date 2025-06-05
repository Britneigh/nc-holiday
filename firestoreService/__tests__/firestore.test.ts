import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getTripById } from "../trip/getTripById"
import { getTrips } from "../trip/getTrips"

const firebaseConfig = {
  apiKey: "emulator-api-key",
  authDomain: "localhost",
  projectId: "emulator-id",
  // ...
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

beforeEach(() => {
    const projectId = "emulator-id";
    const firestoreEmulatorHost = "localhost:8080";
    return fetch(`http://${firestoreEmulatorHost}/emulator/v1/projects/${projectId}/databases/(default)/documents`, {
        method: 'DELETE'
    }) 
    .catch ((error) => {
        console.error("Error clearing Firestore data:", error);
    })
})

describe('GET', () => {
  describe('Get trip by Id', () => {
    test('Returns trip with correct Id', () => {
      getTripById()
    });
  });
});