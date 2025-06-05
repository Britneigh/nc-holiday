import { doc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { type AccomData } from "../types";

export type UpdatableAccomFields = Partial<Omit<AccomData, 'userId' >>;

export function updateAccomDetails( accomId: string, updates: UpdatableAccomFields ): Promise<boolean> {
  const accomDocRef = doc(db, "Accommodation", accomId);

  const dataToUpdate = {
    ...updates,
    updatedAt: serverTimestamp() as Timestamp
  };

  return updateDoc(accomDocRef, dataToUpdate)
    .then(() => {
      console.log(`Accom with ID ${accomId} successfully updated.`);
      return true;
    })
    .catch((error: any) => {
      console.error(`Error updating accom with ID ${accomId}: `, error);
      return false;
    });
}