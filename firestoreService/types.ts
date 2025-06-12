import { Timestamp } from "firebase/firestore";

export interface TripData {
    userId: string;
    tripName: string;
    location: string;
    cost: number;
    startDate: Timestamp;
    endDate: Timestamp;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    pictures?: string[],
}

export interface AccomData {
    userId: string;
    tripId: string,
    name: string;
    location: string;
    cost: number;
    startDate?: Timestamp;
    endDate?: Timestamp;
    rooms?: number;
    beds?: number;
    stars: number;
    description: string;
    bookingLink?: string,
    isBooked: boolean,
    pictures?: string[],
    createdAt: Timestamp,
    updatedAt: Timestamp,
}

// add airline and flightcode
export interface FlightData {
    userId: string;
    airline: string;
    flightCode: string;
    tripId: string,
    cost: number;
    departureTime: Timestamp;
    arrivalTime: Timestamp;
    departureLocation: string;
    arrivalLocation: string;
    stops: string[];
    bookingLink?: string;
    isBooked: boolean;
    pictures?: string[],
    createdAt: Timestamp,
    updatedAt: Timestamp,
    // airline?: string,
    // flightNumber?: string,
    // added for return flight
    isReturnFlight?: boolean;
    returnFlightDetails?: {
        flightCode: string;
        departureTime: Timestamp;
        arrivalTime: Timestamp;
        departureLocation: string;
        arrivalLocation: string;
        airline: string;
        cost: number;
        stops: string[];
    };
}


export interface ActivityData {
    userId: string;
    tripId: string,
    location: string;
    startTime?: Timestamp;
    endTime?: Timestamp;
    description: string;
    cost?: number;
    bookingLink?: string;
    isBooked: boolean;
    pictures?: string[];
    createdAt: Timestamp,
    updatedAt: Timestamp,
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