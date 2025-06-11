import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import { type AccomData } from "../types";

export function addAccom(
  tripId: string,
  accomDetails: Omit<AccomData, 'userId' | 'tripId' | 'createdAt' | 'updatedAt'> & {
    startDate?: Date | Timestamp;
    endDate?: Date | Timestamp;
  }
): Promise<string | null> {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.error("Error adding accommodation: No user logged in.");
    return Promise.resolve(null);
  }

  const startTimestamp = accomDetails.startDate instanceof Date
    ? Timestamp.fromDate(accomDetails.startDate)
    : accomDetails.startDate;

  const endTimestamp = accomDetails.endDate instanceof Date
    ? Timestamp.fromDate(accomDetails.endDate)
    : accomDetails.endDate;

  const newAccomData: AccomData = {
    ...accomDetails,
    tripId: tripId,
    userId: currentUser.uid,
    startDate: startTimestamp,
    endDate: endTimestamp,
    isBooked: accomDetails.isBooked || false,
    createdAt: serverTimestamp() as Timestamp,
    updatedAt: serverTimestamp() as Timestamp,
  };

  const accomsColRef = collection(db, "accommodations");

  return addDoc(accomsColRef, newAccomData)
    .then((docRef) => {
      console.log(`New accommodation added with ID: ${docRef.id}`);
      return docRef.id;
    })
    .catch((error) => {
      console.error(`Error adding accommodation for trip ID ${tripId}: `, error);
      return null;
    });
}