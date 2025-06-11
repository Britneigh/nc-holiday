import { Timestamp } from "firebase/firestore";

export interface ActivityData {
    userId: string;
    location: string;
    startTime?: Timestamp;
    endTime?: Timestamp;
    description: string;
    cost?: number;
    bookingLink?: string;
    isBooked: boolean;
    pictures?: string[];
}

export interface TripData {
    userId: string;
    tripName: string;
    location: string;
    cost: number;
    startDate: Timestamp;
    endDate: Timestamp;
    activities: ActivityData[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface AccomData {
    userId: string;
    name: string;
    location: string;
    cost: number;
    startDate?: Timestamp;
    endDate?: Timestamp;
    rooms: number;
    beds: number;
    stars: number;
    description: string;
}

// add airline and flightcode
export interface FlightData {
    userId: string;
    airline: string;
    flightCode: string;
    cost: number;
    departureTime: Timestamp;
    arrivalTime: Timestamp;
    departureLocation: string;
    arrivalLocation: string;
    stops: string[];
    bookingLink?: string;
    isBooked: boolean;
}

export interface Trip extends TripData {
    id: string;
}

export interface Accom extends AccomData {
    id: string;
}

export interface Activity extends ActivityData {
    id: string;
}

export interface Flight extends FlightData {
    id: string;
}