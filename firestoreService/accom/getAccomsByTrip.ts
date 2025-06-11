// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   QuerySnapshot,
//   QueryDocumentSnapshot,
//   DocumentData
// } from 'firebase/firestore';
// import { db } from "../../firebaseConfig";
// import { type Accom, type AccomData } from "../types"; 

// export function getAccommodationsByTripId(tripId: string): Promise<Accom[] | null> {
//     const accommodationsColRef = collection(db, "accommodation");
//     const q = query(accommodationsColRef, where("tripId", "==", tripId));

//     return getDocs(q)
//         .then((querySnapshot: QuerySnapshot<DocumentData>) => {    
//             const accommodations: Accom[] = [];
//             querySnapshot.forEach((docSnap: QueryDocumentSnapshot<DocumentData>) => {
//                 accommodations.push({ id: docSnap.id, ...(docSnap.data() as AccomData) });
//             });
//             console.log(`Found ${accommodations.length} accommodations for trip ID ${tripId}:`, accommodations);
//             return accommodations;
//         })
//         .catch((error: any) => {
//             console.error(`Error getting accommodations for trip ID ${tripId}:`, error);
//             return null;
//         });
// }


// ABOVE OLD CODE, BELOW CODE THAT WORKS

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { AccomData } from '../types';

export function getAccommodationsByTripId(tripId: string): Promise<AccomData[] | null> {
    const tripDocRef = doc(db, "trips", tripId);

    return getDoc(tripDocRef)
        .then((tripSnap) => {
            if (!tripSnap.exists()) {
                console.warn(`Trip with ID ${tripId} not found`);
                return null;
            }

            const tripData = tripSnap.data();
            const accommodations = tripData.accommodations || [];
            console.log(`Found ${accommodations.length} accommodations for trip ID ${tripId}:`, accommodations);
            return accommodations;
        })
        .catch((error) => {
            console.error(`Error getting accommodations for trip ID ${tripId}:`, error);
            return null;
        });
}
