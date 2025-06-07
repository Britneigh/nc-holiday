import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import { type ActivityData } from "../types";

export function addActivity(
  tripId: string,
  activityDetails: Omit<ActivityData, 'userId' | 'tripId' | 'createdAt' | 'updatedAt'> & {
    startTime?: Date | Timestamp;
    endTime?: Date | Timestamp;
  }
): Promise<string | null> {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.error("Error adding activity: No user logged in.");
    return Promise.resolve(null);
  }

  const startTimeTimestamp = activityDetails.startTime instanceof Date
    ? Timestamp.fromDate(activityDetails.startTime)
    : activityDetails.startTime;

  const endTimeTimestamp = activityDetails.endTime instanceof Date
    ? Timestamp.fromDate(activityDetails.endTime)
    : activityDetails.endTime;

  const newActivityData: ActivityData = {
    ...activityDetails,
    tripId: tripId,
    userId: currentUser.uid,
    startTime: startTimeTimestamp,
    endTime: endTimeTimestamp,
    isBooked: activityDetails.isBooked || false,
    createdAt: serverTimestamp() as Timestamp,
    updatedAt: serverTimestamp() as Timestamp,
  };

  const activitiesColRef = collection(db, "activities");

  return addDoc(activitiesColRef, newActivityData)
    .then((docRef) => {
      console.log(`New activity added with ID: ${docRef.id}`);
      return docRef.id;
    })
    .catch((error) => {
      console.error(`Error adding activity for trip ID ${tripId}: `, error);
      return null;
    });
}
