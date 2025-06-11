// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   QuerySnapshot,
//   QueryDocumentSnapshot,
//   DocumentData
// } from 'firebase/firestore';
// import { db } from "../firebaseConfig";
// import { type Activity, type ActivityData } from "./types"; // Ensure these types are defined

// export function getActivitiesByTripId(tripId: string): Promise<Activity[] | null> {
//     const activitiesColRef = collection(db, "activities");
//     const q = query(activitiesColRef, where("tripId", "==", tripId));

//     return getDocs(q)
//         .then((querySnapshot: QuerySnapshot<DocumentData>) => {    
//             const activities: Activity[] = [];
//             querySnapshot.forEach((docSnap: QueryDocumentSnapshot<DocumentData>) => {
//                 activities.push({ id: docSnap.id, ...(docSnap.data() as ActivityData) });
//             });
//             console.log(`Found ${activities.length} activities for trip ID ${tripId}:`, activities);
//             return activities;
//         })
//         .catch((error: any) => {
//             console.error(`Error getting activities for trip ID ${tripId}:`, error);
//             return null;
//         });
// }



import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { type ActivityData } from '../types';

export function getActivitiesByTripId(tripId: string): Promise<ActivityData[] | null> {
    const tripDocRef = doc(db, "trips", tripId);

    return getDoc(tripDocRef)
        .then((docSnap) => {
            if (!docSnap.exists()) {
                console.warn(`Trip with ID ${tripId} not found`);
                return null;
            }

            const tripData = docSnap.data();
            const activities = tripData.activities || [];
            console.log(`Found ${activities.length} activities in trip document for trip ID ${tripId}:`, activities);
            return activities;
        })
        .catch((error) => {
            console.error(`Error getting activities for trip ID ${tripId}:`, error);
            return null;
        });
}
