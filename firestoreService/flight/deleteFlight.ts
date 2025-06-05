import { doc, deleteDoc } from 'firebase/firestore';
import { db } from "../../firebaseConfig";

export function deleteFlight(flightId: string): Promise<boolean | null> {
    const flightDocRef = doc(db, "flights", flightId);

    return deleteDoc(flightDocRef)
        .then(() => {
            console.log(`FLight with ID ${flightId} successfully deleted.`);
            return true;
        })
        .catch((error: any) => {
            console.error(`Error deleting flight with ID ${flightId}: `, error);
            return false;
        });
}