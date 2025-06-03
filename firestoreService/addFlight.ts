import { doc, updateDoc, arrayUnion, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { type FlightData } from "./types";

export function addFlight(
  tripId: string,
  flightDetails: Omit<FlightData, 'userId'> & {
    departureTime: Date | Timestamp; 
    arrivalTime: Date | Timestamp;
  }
): Promise<boolean> {
  const tripDocRef = doc(db, "trips", tripId);

  const departureTimestamp = flightDetails.departureTime instanceof Date
    ? Timestamp.fromDate(flightDetails.departureTime)
    : flightDetails.departureTime;

  const arrivalTimestamp = flightDetails.arrivalTime instanceof Date
    ? Timestamp.fromDate(flightDetails.arrivalTime)
    : flightDetails.arrivalTime;

  const newFlight: Omit<FlightData, 'userId'> = {
    ...flightDetails,
    departureTime: departureTimestamp,
    arrivalTime: arrivalTimestamp,
    isBooked: flightDetails.isBooked || false, 
    cost: flightDetails.cost,
    departureLocation: flightDetails.departureLocation,
    arrivalLocation: flightDetails.arrivalLocation,
    stops: flightDetails.stops,
    bookingLink: flightDetails.bookingLink,
  };

  return updateDoc(tripDocRef, {
    flights: arrayUnion(newFlight),
    updatedAt: serverTimestamp()
  })
  .then(() => {
    console.log(`Flight added to trip ID: ${tripId}`);
    return true;
  })
  .catch((error) => {
    console.error(`Error adding flight to trip ID ${tripId}: `, error);
    return false;
  });
}