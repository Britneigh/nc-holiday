import { doc, getDoc, DocumentSnapshot } from 'firebase/firestore';
import { db } from "../../firebaseConfig";
import { type Trip, type TripData } from "../types"

export function getTripById(tripId: string) {
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