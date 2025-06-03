import { doc, updateDoc, arrayUnion, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { type AccomData } from "./types"; // Assuming AccomData is in your types file

export function addAccom(
  tripId: string,
  accomDetails: Omit<AccomData, 'userId'> & {
    startDate?: Date | Timestamp;
    endDate?: Date | Timestamp;
  }
): Promise<boolean> {
  const tripDocRef = doc(db, "trips", tripId);

  const startTimestamp = accomDetails.startDate instanceof Date
    ? Timestamp.fromDate(accomDetails.startDate)
    : accomDetails.startDate;

  const endTimestamp = accomDetails.endDate instanceof Date
    ? Timestamp.fromDate(accomDetails.endDate)
    : accomDetails.endDate;

  const newAccom: Omit<AccomData, 'userId'> = {
    ...accomDetails,
    startDate: startTimestamp,
    endDate: endTimestamp,
    name: accomDetails.name,
    location: accomDetails.location,
    cost: accomDetails.cost,
    rooms: accomDetails.rooms,
    beds: accomDetails.beds,
    stars: accomDetails.stars,
    description: accomDetails.description,
  };

  return updateDoc(tripDocRef, {
    accommodations: arrayUnion(newAccom),
    updatedAt: serverTimestamp()
  })
  .then(() => {
    console.log(`Accommodation added to trip ID: ${tripId}`);
    return true;
  })
  .catch((error) => {
    console.error(`Error adding accommodation to trip ID ${tripId}: `, error);
    return false;
  });
}