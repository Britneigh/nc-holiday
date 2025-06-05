import { doc, deleteDoc } from 'firebase/firestore';
import { db } from "../../firebaseConfig";

export function deleteTrip(tripId: string): Promise<boolean | null> {
    const tripDocRef = doc(db, "trips", tripId);

    return deleteDoc(tripDocRef)
        .then(() => {
            console.log(`Trips with ID ${tripId} successfully deleted.`);
            return true;
        })
        .catch((error: any) => {
            console.error(`Error deleting trip with ID ${tripId}: `, error);
            return false;
        });
}