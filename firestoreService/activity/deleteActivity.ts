import { doc, deleteDoc } from 'firebase/firestore';
import { db } from "../../firebaseConfig";

export function deleteActivity(activityId: string): Promise<boolean | null> {
    const activityDocRef = doc(db, "activities", activityId);

    return deleteDoc(activityDocRef)
        .then(() => {
            console.log(`activitymodation with ID ${activityId} successfully deleted.`);
            return true;
        })
        .catch((error: any) => {
            console.error(`Error deleting activity with ID ${activityId}: `, error);
            return false;
        });
}