// firestoreService/__tests__/testUtils.ts
import { initializeApp, getApp, deleteApp, App } from 'firebase-admin/app';
import { getFirestore as getAdminFirestore } from 'firebase-admin/firestore';
import { credential } from 'firebase-admin';
import { Accom, Activity, Flight } from '../types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

let adminApp: App;

export const getTestAdminApp = () => {
  if (!adminApp) {
    try {
      adminApp = getApp("jest-admin-app");
    } catch (e) {
      adminApp = initializeApp({
        projectId: process.env.FIRESTORE_EMULATOR_PROJECT_ID || "emulator-id",
      }, "jest-admin-app");
    }
  }
  return adminApp;
};

export const clearFirestoreEmulatorData = () => {
  const projectId = "emulator-id";
  const firestoreHost = "localhost:8080";

  return fetch(
      `http://${firestoreHost}/emulator/v1/projects/${projectId}/databases/(default)/documents`,
      { method: 'DELETE' }
    )
    .then((response) => {
      if (!response.ok) {
        console.warn(`Warning: Clearing Firestore returned status ${response.status}`);
      }
    })
    .catch ((error) =>{
      console.error("Error clearing Firestore emulator data:", error)
    })
  
}

export const getAccomById = (id: string): Promise<Accom | null> => {
  return getDoc(doc(db, "accommodations", id)).then(docSnap => {
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Accom;
    }
    return null;
  });
};

export const getFlightById = (id: string): Promise<Flight | null> => {
    return getDoc(doc(db, "flights", id)).then(docSnap => {
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Flight;
        }
        return null;
    });
};

export const getActivityById = (id: string): Promise<Activity | null> => {
    return getDoc(doc(db, "activities", id)).then(docSnap => {
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Activity;
        }
        return null;
    });
};