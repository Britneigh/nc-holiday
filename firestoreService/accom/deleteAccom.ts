import { doc, deleteDoc } from 'firebase/firestore';
import { db } from "../../firebaseConfig";

export function deleteAccom(accomId: string): Promise<boolean | null> {
    const accomDocRef = doc(db, "accomodations", accomId);

    return deleteDoc(accomDocRef)
        .then(() => {
            console.log(`Accommodation with ID ${accomId} successfully deleted.`);
            return true;
        })
        .catch((error: any) => {
            console.error(`Error deleting accommodtion with ID ${accomId}: `, error);
            return false;
        });
}