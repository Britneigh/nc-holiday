import { collection, query, where, getDocs, Timestamp, orderBy, QuerySnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { type MemoryData, Memory } from "../types";

export function getMemoriesByTrip(tripId: string): Promise<Memory[]> {
  console.log(`Fetching memories for tripId: ${tripId}`);
  
  if (!tripId) {
    console.error("getMemoriesByTrip was called without a tripId.");
    return [];
  }
const memoriesCollectionRef = collection(db, "memories");
const q = query(
    memoriesCollectionRef, 
    where("tripId", "==", tripId),
    orderBy("date", "desc")
);

return getDocs(q)
    .then ((querySnapshot) => {

        const memories: Memory[] = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as MemoryData)
        }));
        
        console.log(`Found ${memories.length} memories.`);
        return memories;
    })

    .catch ((error) => {
        console.error("Error fetching memories by trip:", error);
        return [];
    })

}

// export async function getMemoriesByTrip(tripId: string): Promise<Memory[]> {
//   console.log(`Fetching memories for tripId: ${tripId}`);
  
//   if (!tripId) {
//     console.error("getMemoriesByTrip was called without a tripId.");
//     return [];
//   }

//   try {
//     const memoriesCollectionRef = collection(db, "memories");
//     const q = query(
//         memoriesCollectionRef, 
//         where("tripId", "==", tripId),
//         orderBy("date", "desc")
//     );

//     // Use await to get the result of the query directly
//     const querySnapshot = await getDocs(q);

//     const memories: Memory[] = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...(doc.data() as MemoryData)
//     }));
    
//     console.log(`Found ${memories.length} memories.`);
//     return memories;

//   } catch (error) {
//     console.error("Error fetching memories by trip:", error);
//     // Return an empty array in case of an error to prevent the app from crashing
//     return [];
//   }
// }
