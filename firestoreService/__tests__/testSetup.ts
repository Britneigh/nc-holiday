import { doc, serverTimestamp, setDoc, Timestamp } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, User, createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../../firebaseConfig';
import { 
    type TripData,
    type AccomData,
    type FlightData,
    type ActivityData

 } from '../types';
import { clearFirestoreEmulatorData } from './testUtils';

export const TEST_USER_EMAIL = "test@example.com";
export const TEST_USER_PASSWORD = "password123";
export const DIFFERENT_USER_ID = "anotherUser456";
export const SAMPLE_TRIP_1_TRIP_ID = 'trip1'
export const SAMPLE_TRIP_2_TRIP_ID = 'trip2'
export const SAMPLE_TRIP_OTHER_TRIP_ID = 'otherTrip'


export const sampleTrip1: Omit< TripData, 'userId' | 'createdAt' | 'updatedAt'> = {
    tripName: "Jest Test Trip to Paris",
    location: "Paris, France",
    cost: 1200,
    startDate: Timestamp.fromDate(new Date("2025-08-01")),
    endDate: Timestamp.fromDate(new Date("2025-08-08")),
};

export const sampleTrip2: Omit< TripData, 'userId' | 'createdAt' | 'updatedAt'> = {
    tripName: "SE Asia",
    location: "Indonesia",
    cost: 500,
    startDate: Timestamp.fromDate(new Date("2025-06-17")),
    endDate: Timestamp.fromDate(new Date("2025-08-17")),
};

export const otherUserTrip: Omit< TripData, 'createdAt' | 'updatedAt' | 'userId'> = {
    tripName: "Africa",
    location: "Sahara Desert",
    cost: 800,
    startDate: Timestamp.fromDate(new Date("2025-11-01")),
    endDate: Timestamp.fromDate(new Date("2025-11-05")),
};

export const accom1ForTrip1: Omit< AccomData, 'userId' | 'createdAt' | 'updatedAt'> = {
  tripId: SAMPLE_TRIP_1_TRIP_ID,
  name: 'Hotel du Centre',
  location: '1st arrondissement, Paris, France',
  cost: 850,
  startDate: Timestamp.fromDate(new Date("2025-08-01")),
  endDate: Timestamp.fromDate(new Date("2025-08-08")),
  stars: 4,
  description: 'A lovely hotel near the Louvre.',
  isBooked: true,
};

export const accom2ForTrip1: Omit< AccomData, 'userId' | 'createdAt' | 'updatedAt'> = {
  tripId: SAMPLE_TRIP_1_TRIP_ID,
  name: 'Black Hotel',
  location: '1st black, Blackville street, Blackson',
  cost: 850,
  startDate: Timestamp.fromDate(new Date("2025-08-01")),
  endDate: Timestamp.fromDate(new Date("2025-08-08")),
  stars: 4,
  description: 'A black hotel',
  isBooked: false,
};

export const accom1ForTrip2: Omit< AccomData, 'userId' | 'createdAt' | 'updatedAt'> = {
  tripId: SAMPLE_TRIP_2_TRIP_ID,
  name: 'White',
  location: '1st white, Whiteville street, Whiteson',
  cost: 850,
  startDate: Timestamp.fromDate(new Date("2025-08-01")),
  endDate: Timestamp.fromDate(new Date("2025-08-08")),
  stars: 4,
  description: 'A white hotel',
  isBooked: false,
};

export const accomForOtherUser: Omit< AccomData, 'userId' | 'createdAt' | 'updatedAt'> = {
  tripId: SAMPLE_TRIP_OTHER_TRIP_ID,
  name: 'Bog',
  location: '3rd Bog, Bogtown, The Boglands',
  cost: 850,
  startDate: Timestamp.fromDate(new Date("2025-08-01")),
  endDate: Timestamp.fromDate(new Date("2025-08-08")),
  stars: 4,
  description: 'Bog',
  isBooked: false,
};

export const flight1ForTrip1: Omit< FlightData, 'userId' | 'createdAt' | 'updatedAt' > = {
  tripId: SAMPLE_TRIP_1_TRIP_ID,
  departureLocation: 'London Heathrow',
  arrivalLocation: 'Paris',
  departureTime: Timestamp.fromDate(new Date("2025-08-01T07:00:00Z")),
  arrivalTime: Timestamp.fromDate(new Date("2025-08-01T09:20:00Z")),
  airline: 'Ryanaie',
  cost: 250,
  isBooked: true,
  stops: [],
};

export const flight2ForTrip1: Omit< FlightData, 'userId' | 'createdAt' | 'updatedAt' > = {
  tripId: SAMPLE_TRIP_1_TRIP_ID,
  departureLocation: 'Paris',
  arrivalLocation: 'London Heathrow',
  departureTime: Timestamp.fromDate(new Date("2025-08-08T18:00:00Z")),
  arrivalTime: Timestamp.fromDate(new Date("2025-08-08T18:20:00Z")),
  airline: 'Air',
  cost: 280,
  isBooked: false,
  stops: [],
};

export const flight1ForTrip2: Omit< FlightData, 'userId' | 'createdAt' | 'updatedAt' > = {
  tripId: SAMPLE_TRIP_2_TRIP_ID,
  departureLocation: 'Manchester',
  arrivalLocation: 'Denpasar',
  departureTime: Timestamp.fromDate(new Date("2025-06-16T21:00:00Z")),
  arrivalTime: Timestamp.fromDate(new Date("2025-06-17T20:00:00Z")),
  stops: [],
  airline: 'Qatar Airways',
  cost: 950,
  isBooked: true,
};

export const flightForOtherUser: Omit< FlightData, 'userId' | 'createdAt' | 'updatedAt' > = {
  tripId: SAMPLE_TRIP_OTHER_TRIP_ID,
  departureLocation: 'Haiti',
  arrivalLocation: 'The moon',
  departureTime: Timestamp.fromDate(new Date("2025-06-16T21:00:00Z")),
  arrivalTime: Timestamp.fromDate(new Date("2025-06-17T20:00:00Z")),
  stops: [],
  airline: 'NASA',
  cost: 950000000,
  isBooked: true,
};

export const activity1ForTrip1: Omit< ActivityData, 'userId' | 'createdAt' | 'updatedAt' > = {
  tripId: SAMPLE_TRIP_1_TRIP_ID,
  description: 'Visit the Louvre Museum',
  location: 'Louvre Museum',
  cost: 22,
  startTime: Timestamp.fromDate(new Date("2025-08-02T10:00:00Z")),
  endTime: Timestamp.fromDate(new Date("2025-08-02T14:00:00Z")),
  isBooked: true,
};

export const activity2ForTrip1: Omit< ActivityData, 'userId' | 'createdAt' | 'updatedAt' > = {
  tripId: SAMPLE_TRIP_1_TRIP_ID,
  description: 'Explore',
  location: 'Paris, France',
  cost: 0,
  startTime: Timestamp.fromDate(new Date("2025-08-03T15:00:00Z")),
  endTime: Timestamp.fromDate(new Date("2025-08-03T18:00:00Z")),
  isBooked: false,
};

export const activity1ForTrip2: Omit< ActivityData, 'userId' | 'createdAt' | 'updatedAt' > = {
  tripId: SAMPLE_TRIP_2_TRIP_ID,
  description: 'Snorkeling',
  location: 'Bali, Indonesia',
  cost: 50,
  startTime: Timestamp.fromDate(new Date("2025-06-18T09:00:00Z")),
  endTime: Timestamp.fromDate(new Date("2025-06-18T11:00:00Z")),
  isBooked: true,
}

export const activityForOtherUser: Omit< ActivityData, 'userId' | 'createdAt' | 'updatedAt' > = {
  tripId: SAMPLE_TRIP_OTHER_TRIP_ID,
  description: 'Eating rocks',
  location: 'Bali, Indonesia',
  cost: 50,
  startTime: Timestamp.fromDate(new Date("2025-06-18T09:00:00Z")),
  endTime: Timestamp.fromDate(new Date("2025-06-18T11:00:00Z")),
  isBooked: true,
}

export function loginTestUser(): Promise<void> {

    return signInWithEmailAndPassword(auth, TEST_USER_EMAIL, TEST_USER_PASSWORD)
        .then((userCredential) => {
            console.log(`Test user logged in for suite: ${userCredential.user.email}`);
            userCredential.user;
        })
        .catch((error) => {
            console.error("Critical test setup error: Could not log in test user.", error);
            throw new Error("Test user login failed, cannot proceed with tests.");
        })
}

export function setupTestUser(
  email: string = TEST_USER_EMAIL,
  password: string = TEST_USER_PASSWORD
): Promise<User> {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(`Test user signed in: ${userCredential.user.email}`);
      return userCredential.user;
    })
    .catch((error: any) => {
      if (error.code === 'auth/user-not-found') {
        console.log(`User ${email} not found, creating new user...`);
        return createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log(`User created and signed in: ${userCredential.user.email}`);
            return userCredential.user;
          })
          .catch((createError) => {
            console.error("Could not create test user.", createError);
            throw new Error("Test user creation failed.");
          });
      }
      console.error("Could not log in test user.", error);
      throw new Error("Test user login failed.");
    });
}

export async function seedTestData(uid: string): Promise<void> {
  const serverTime = Timestamp.fromDate(new Date());
    const documentsToSeed = [
        { collection: "trips", id: SAMPLE_TRIP_1_TRIP_ID, data: { ...sampleTrip1,  userId: uid, createdAt: serverTime, updatedAt: serverTime } },
        { collection: "trips", id: SAMPLE_TRIP_2_TRIP_ID, data: { ...sampleTrip2,  userId: uid, createdAt: serverTime, updatedAt: serverTime } },
        { collection: "trips", id: SAMPLE_TRIP_OTHER_TRIP_ID, data: { ...otherUserTrip, userId: DIFFERENT_USER_ID, createdAt: serverTime, updatedAt: serverTime } },
        
        { collection: "accommodation", id: "accom1", data: { ...accom1ForTrip1, tripId: SAMPLE_TRIP_1_TRIP_ID,  userId: uid, createdAt: serverTime, updatedAt: serverTime } },
        { collection: "accommodation", id: "accom2", data: { ...accom2ForTrip1, tripId: SAMPLE_TRIP_1_TRIP_ID,  userId: uid, createdAt: serverTime, updatedAt: serverTime } },
        { collection: "accommodation", id: "accom3", data: { ...accom1ForTrip2, tripId: SAMPLE_TRIP_2_TRIP_ID,  userId: uid, createdAt: serverTime, updatedAt: serverTime } },
        { collection: "accommodation", id: "accom4", data: { ...accomForOtherUser, tripId: SAMPLE_TRIP_OTHER_TRIP_ID, userId: DIFFERENT_USER_ID, createdAt: serverTime, updatedAt: serverTime} },
        
        { collection: "flights", id: "flight1", data: { ...flight1ForTrip1, tripId: SAMPLE_TRIP_1_TRIP_ID,  userId: uid, createdAt: serverTime, updatedAt: serverTime } },
        { collection: "flights", id: "flight2", data: { ...flight2ForTrip1, tripId: SAMPLE_TRIP_1_TRIP_ID,  userId: uid, createdAt: serverTime, updatedAt: serverTime } },
        { collection: "flights", id: "flight3", data: { ...flight1ForTrip2, tripId: SAMPLE_TRIP_2_TRIP_ID,  userId: uid, createdAt: serverTime, updatedAt: serverTime } },
        { collection: "flights", id: "flight4", data: { ...flightForOtherUser, tripId: SAMPLE_TRIP_OTHER_TRIP_ID, userId: DIFFERENT_USER_ID, createdAt: serverTime, updatedAt: serverTime} },

        { collection: "activities", id: "activity1", data: { ...activity1ForTrip1, tripId: SAMPLE_TRIP_1_TRIP_ID,  userId: uid, createdAt: serverTime, updatedAt: serverTime } },
        { collection: "activities", id: "activity2", data: { ...activity2ForTrip1, tripId: SAMPLE_TRIP_1_TRIP_ID,  userId: uid, createdAt: serverTime, updatedAt: serverTime } },
        { collection: "activities", id: "activity3", data: { ...activity1ForTrip2, tripId: SAMPLE_TRIP_2_TRIP_ID,  userId: uid, createdAt: serverTime, updatedAt: serverTime } },
        { collection: "activities", id: "activity4", data: { ...activityForOtherUser, tripId: SAMPLE_TRIP_OTHER_TRIP_ID, userId: DIFFERENT_USER_ID, createdAt: serverTime, updatedAt: serverTime}}
    ];

    for (const docToSeed of documentsToSeed) {
        await setDoc(doc(db, docToSeed.collection, docToSeed.id), docToSeed.data);
    }
    
    console.log(`Database seeded with ${documentsToSeed.length} test documents.`);

    return Promise.resolve()
}

export function cleanupAfterTests(): Promise<void> {
    return clearFirestoreEmulatorData()
        .then(() => {
            if (auth.currentUser) {
                return signOut(auth)
                    .then(() => console.log("Test user signed out."))
            }
        })
        .catch((error: any) => {
            console.error("Error during cleanup process:", error);
        });
}