import { doc, getDoc, DocumentSnapshot } from 'firebase/firestore';
import { db } from "../firebaseConfig.js";
import { Timestamp } from 'firebase/firestore';
// import { type Trip, type TripData } from "./types"

interface ActivityData {
    userId: string;
    location: string;
    startTime?: Timestamp;
    endTime?: Timestamp;
    description: string;
    cost?: number;
    bookingLink?: string;
    isBooked: boolean;
    pictures?: string[];
}

 interface TripData {
    userId: string;
    tripName: string;
    location: string;
    cost: number;
    startDate: Timestamp;
    endDate: Timestamp;
    activities: ActivityData[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

interface Trip extends TripData {
    id: string;
}

export function getTripById(tripId: string): Promise<Trip | null> {
    const tripDocRef = doc(db ,"trips", tripId);
    
    return getDoc(tripDocRef)
        .then((tripSnap: DocumentSnapshot) => {
            if (tripSnap) {
                const tripDataFromFirestore = tripSnap.data() as TripData
                const tripWithId: Trip = {
                    id: tripSnap.id,
                    ...tripDataFromFirestore
                };
                console.log("Trip object to be returned: ", tripWithId);
                return tripWithId
            }
            else {
                console.log("No such trip document!");
                return null;
            }
        })
        .catch ((error) => {
            console.log("Error getting trip: ", error);
            return null;
        })
}

getTripById("yxyQzZ8adGc3O36DV6tT");