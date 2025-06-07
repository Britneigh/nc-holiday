# Trip - FLight Workflow #

## How to add a trip ##

Call **addTrip** while logged in, which takes:

```
{
    tripName: string;
    location: string;
    startDate: Timestamp;
    endDate: Timestamp;
    pictures?: string[], (optional)
}
```

and returns the **id** of the new trip that has been created in the collection "trips.

## How to view trips ## 

Call **getTrips** while logged in. This returns a list of the trips for that user.

```
[
      {
        id: 'trip1',
        tripName: 'Jest Test Trip to Paris',
        location: 'Paris, France',
        cost: 1200,
        startDate: Timestamp { seconds: 1754006400, nanoseconds: 0 },
        endDate: Timestamp { seconds: 1754611200, nanoseconds: 0 },
        userId: 'sMhzbx97C3Ywp8KD0wKeKzanP17n',
        createdAt: Timestamp { seconds: 1749286245, nanoseconds: 112000000 },
        updatedAt: Timestamp { seconds: 1749286245, nanoseconds: 112000000 }
      },
      {
        id: 'trip2',
        tripName: 'SE Asia',
        location: 'Indonesia',
        cost: 500,
        startDate: Timestamp { seconds: 1750118400, nanoseconds: 0 },
        endDate: Timestamp { seconds: 1755388800, nanoseconds: 0 },
        userId: 'sMhzbx97C3Ywp8KD0wKeKzanP17n',
        createdAt: Timestamp { seconds: 1749286245, nanoseconds: 112000000 },
        updatedAt: Timestamp { seconds: 1749286245, nanoseconds: 112000000 }
      }
    ]
```

## How to add flight to trip ##

Call **addFlight** with the trip id and flight data to add a flight to a trip. Takes:

```
(
  tripId: string,
  flightDetails: {
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
    airline?: string,
    flightNumber?: string,
  }
)
```

and returns a promise that resolves to the id of the flight if it was successful and null if not.

## How to see flighrs for a trip ##

Call **getFlights** with the trip id to see the flights associated with that trip. Takes:

```
tripId
```

and returns an array of flightas:

```
 [
      {
        id: 'flight1',
        tripId: 'trip1',
        departureLocation: 'London Heathrow',
        arrivalLocation: 'Paris',
        departureTime: Timestamp { seconds: 1754031600, nanoseconds: 0 },
        arrivalTime: Timestamp { seconds: 1754040000, nanoseconds: 0 },
        airline: 'Ryanaie',
        cost: 250,
        isBooked: true,
        stops: [],
        userId: 'aq6wzYE3XhtSrurjU5M8Q3lYDipx',
        createdAt: Timestamp { seconds: 1749287371, nanoseconds: 474000000 },
        updatedAt: Timestamp { seconds: 1749287371, nanoseconds: 474000000 }
      },
      {
        id: 'flight2',
        tripId: 'trip1',
        departureLocation: 'Paris',
        arrivalLocation: 'London Heathrow',
        departureTime: Timestamp { seconds: 1754676000, nanoseconds: 0 },
        arrivalTime: Timestamp { seconds: 1754677200, nanoseconds: 0 },
        airline: 'Air',
        cost: 280,
        isBooked: false,
        stops: [],
        userId: 'aq6wzYE3XhtSrurjU5M8Q3lYDipx',
        createdAt: Timestamp { seconds: 1749287371, nanoseconds: 474000000 },
        updatedAt: Timestamp { seconds: 1749287371, nanoseconds: 474000000 }
      }
    ]
```

