import { collection, addDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import { type TripData, type ActivityData } from "../types";

export function addTrip(
  tripDetails: Omit<TripData, 'userId' | 'createdAt' | 'updatedAt' | 'cost'> & {
    startDate: Date | Timestamp;
    endDate: Date | Timestamp;
  }
): Promise<string | null> {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.error("Error adding trip: No user logged in.");
    return Promise.resolve(null);
  }

  const startDateTimestamp = tripDetails.startDate instanceof Date 
      ? Timestamp.fromDate(tripDetails.startDate) 
      : tripDetails.startDate;
  const endDateTimestamp = tripDetails.endDate instanceof Date 
      ? Timestamp.fromDate(tripDetails.endDate) 
      : tripDetails.endDate;

  const newTripData: TripData = {
    ...tripDetails,
    userId: currentUser.uid,
    startDate: startDateTimestamp,
    endDate: endDateTimestamp,
    createdAt: serverTimestamp() as Timestamp,
    updatedAt: serverTimestamp() as Timestamp,
    cost: 0,
  };

  const tripsColRef = collection(db, "trips");
  
  return addDoc(tripsColRef, newTripData)
    .then((docRef) => {
      console.log("Trip added with ID: ", docRef.id);
      return docRef.id;
    })
    .catch((error) => {
      console.error("Error adding new trip: ", error);
      return null;
    });
}