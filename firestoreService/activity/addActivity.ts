import { doc, updateDoc, arrayUnion, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { type ActivityData } from "./types";

export function addActivity(
  tripId: string,
  activityDetails: Omit<ActivityData, 'userId'> & { // Assuming userId in ActivityData is optional or handled differently
    startTime?: Date | Timestamp;
    endTime?: Date | Timestamp;
  }
): Promise<boolean> {
  const tripDocRef = doc(db, "trips", tripId);

  const startTimeTimestamp = activityDetails.startTime instanceof Date
    ? Timestamp.fromDate(activityDetails.startTime)
    : activityDetails.startTime;

  const endTimeTimestamp = activityDetails.endTime instanceof Date
    ? Timestamp.fromDate(activityDetails.endTime)
    : activityDetails.endTime;

  const newActivity: ActivityData = {
    ...activityDetails,
    startTime: startTimeTimestamp,
    endTime: endTimeTimestamp,
    isBooked: activityDetails.isBooked || false, // Default isBooked if not provided
  };

  return updateDoc(tripDocRef, {
    activities: arrayUnion(newActivity),
    updatedAt: serverTimestamp()
  })
  .then(() => {
    console.log(`Activity added to trip ID: ${tripId}`);
    return true;
  })
  .catch((error) => {
    console.error(`Error adding activity to trip ID ${tripId}: `, error);
    return false;
  });
}
