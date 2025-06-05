import { doc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { type TripData } from "../types";

export type UpdatableTripFields = Partial<Omit<TripData, 'userId' | 'createdAt' | 'updatedAt'>>;

export function updateTripDetails( tripId: string, updates: UpdatableTripFields ): Promise<boolean> {
  const tripDocRef = doc(db, "trips", tripId);

  const dataToUpdate = {
    ...updates,
    updatedAt: serverTimestamp() as Timestamp
  };

  return updateDoc(tripDocRef, dataToUpdate)
    .then(() => {
      console.log(`Trip with ID ${tripId} successfully updated.`);
      return true;
    })
    .catch((error: any) => {
      console.error(`Error updating trip with ID ${tripId}: `, error);
      return false;
    });
}