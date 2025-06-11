import { doc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { type FlightData } from "../types";

export type UpdatableFlightFields = Partial<Omit<FlightData, 'userId'>>;

export function updateFlightDetails( flightId: string, updates: UpdatableFlightFields ): Promise<boolean> {
  const flightDocRef = doc(db, "flights", flightId);

  const dataToUpdate = {
    ...updates,
    updatedAt: serverTimestamp() as Timestamp
  };

  return updateDoc(flightDocRef, dataToUpdate)
    .then(() => {
      console.log(`Flight with ID ${flightId} successfully updated.`);
      return true;
    })
    .catch((error: any) => {
      console.error(`Error updating flight with ID ${flightId}: `, error);
      return false;
    });
}