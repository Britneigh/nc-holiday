import { doc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { type ActivityData } from "../types";

export type UpdatableActivityFields = Partial<Omit<ActivityData, 'userId'>>;

export function updateActivityDetails( activityId: string, updates: UpdatableActivityFields ): Promise<boolean> {
  const activityDocRef = doc(db, "activities", activityId);

  const dataToUpdate = {
    ...updates,
    updatedAt: serverTimestamp() as Timestamp
  };

  return updateDoc(activityDocRef, dataToUpdate)
    .then(() => {
      console.log(`Activity with ID ${activityId} successfully updated.`);
      return true;
    })
    .catch((error: any) => {
      console.error(`Error updating activity with ID ${activityId}: `, error);
      return false;
    });
}