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
// import { type Flight, type FlightData } from "./types";

// export function getFlightsByTripId(tripId: string): Promise<Flight[] | null> {
//     const flightsColRef = collection(db, "flights");
//     const q = query(flightsColRef, where("tripId", "==", tripId));

//     return getDocs(q)
//         .then((querySnapshot: QuerySnapshot<DocumentData>) => {    
//             const flights: Flight[] = [];
//             querySnapshot.forEach((docSnap: QueryDocumentSnapshot<DocumentData>) => {
//                 flights.push({ id: docSnap.id, ...(docSnap.data() as FlightData) });
//             });
//             console.log(`Found ${flights.length} flights for trip ID ${tripId}:`, flights);
//             return flights;
//         })
//         .catch((error: any) => {
//             console.error(`Error getting flights for trip ID ${tripId}:`, error);
//             return null;
//         });
// }




import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { type FlightData } from '../types';

export function getFlightsByTripId(tripId: string): Promise<FlightData[] | null> {
    const tripDocRef = doc(db, "trips", tripId);

    return getDoc(tripDocRef)
        .then((docSnap) => {
            if (!docSnap.exists()) {
                console.warn(`Trip with ID ${tripId} not found`);
                return null;
            }

            const tripData = docSnap.data();
            const flights = tripData.flights || [];
            console.log(`Found ${flights.length} flights in trip document for trip ID ${tripId}:`, flights);
            return flights;
        })
        .catch((error) => {
            console.error(`Error getting flights for trip ID ${tripId}:`, error);
            return null;
        });
}
