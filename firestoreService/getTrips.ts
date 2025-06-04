import { 
  collection, 
  query, 
  where, 
  getDocs, 
  DocumentData, 
  QuerySnapshot, 
  QueryDocumentSnapshot 
} from 'firebase/firestore';
import { db, auth } from "../firebaseConfig"; // Your initialized instances
import { type Trip, type TripData } from "./types"; // Your defined interfaces

export function getCurrentUserTrips(): Promise<Trip[] | null> {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.log("No user logged in");
    return Promise.resolve([]);
  }

  const tripsColRef = collection(db, "trips");
  const q = query(tripsColRef, where("userId", "==", currentUser.uid));
  
  return getDocs(q)
    .then((querySnapshot: QuerySnapshot<DocumentData>) => {
      const myTrips: Trip[] = [];

      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => { 
        const tripDocumentData = doc.data() as TripData;
        myTrips.push({ id: doc.id, ...tripDocumentData });
      });

      console.log("My trips: ", myTrips);
      return myTrips;
    })
    .catch((error: any) => { // Typed error (can also use Error or unknown)
      console.error("Error getting trips: ", error);
      return null;
    });
}