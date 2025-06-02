import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from "../firebaseConfig";
import { type Trip, type TripData } from "./types"

export function getTripsByUser(userId: string) {
    const currentUser = auth.currentUser

    if (!currentUser) {
        console.log("No user logged in") 
        return []
    }

    const tripsColRef = collection(db ,"trips");

    const q = query(tripsColRef, where("userId", "==", currentUser.uid))
    
    return getDocs(q)
        .then((querySnapshot) => {
           const myTrips = [];
           querySnapshot.forEach((doc) => {
            myTrips.push({id: doc.id, ...doc.data()});
           })
           console.log("My trips: ", myTrips);
           return myTrips
        })
        .catch ((error) => {
            console.log("Error getting trips: ", error);
            return null;
        })
}