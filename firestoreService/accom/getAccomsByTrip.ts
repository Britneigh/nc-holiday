import {
    collection,
    query,
    where,
    getDocs,
    QuerySnapshot,
    QueryDocumentSnapshot,
    DocumentData
} from 'firebase/firestore';
import { db } from "../../firebaseConfig";
import { type Accom, type AccomData } from "../types";

export function getAccomsByTrip(tripId: string): Promise<Accom[] | null> {
    const accommodationsColRef = collection(db, "accommodations");
    const q = query(accommodationsColRef, where("tripId", "==", tripId));

    return getDocs(q)
        .then((querySnapshot: QuerySnapshot<DocumentData>) => {
            const accommodations: Accom[] = [];
            querySnapshot.forEach((docSnap: QueryDocumentSnapshot<DocumentData>) => {
                accommodations.push({ id: docSnap.id, ...(docSnap.data() as AccomData) });
            });
            console.log(`Found ${accommodations.length} accommodations for trip ID ${tripId}:`, accommodations);
            return accommodations;
        })
        .catch((error) => {
            console.error(`Error getting accommodations for trip ID ${tripId}:`, error);
            return null;
        });
}
