import {
  collection,
  query,
  where,
  getDocs,
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from "../firebaseConfig";
import { type Activity, type ActivityData } from "./types"; 

export function getActivitiesByTripId(tripId: string): Promise<Activity[] | null> {
    const activitiesColRef = collection(db, "activities");
    const q = query(activitiesColRef, where("tripId", "==", tripId));
    
    return getDocs(q)
        .then((querySnapshot: QuerySnapshot<DocumentData>) => {    
            const activities: Activity[] = [];
            querySnapshot.forEach((docSnap: QueryDocumentSnapshot<DocumentData>) => {
                activities.push({ id: docSnap.id, ...(docSnap.data() as ActivityData) });
            });
            console.log(`Found ${activities.length} activities for trip ID ${tripId}:`, activities);
            return activities;
        })
        .catch((error: any) => {
            console.error(`Error getting activities for trip ID ${tripId}:`, error);
            return null;
        });
}