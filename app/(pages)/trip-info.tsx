import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Trip } from '@/firestoreService/types';
import { getTripById } from '@/firestoreService/trip/getTripById';
import { getAccommodationsByTripId } from '@/firestoreService/accom/getAccomsByTrip';
import GoBackHeader from '@/components/GoBackHeader';
import { getFlightsByTripId } from '@/firestoreService/flight/getFlightsByTrip';
import { getActivitiesByTripId } from '@/firestoreService/activity/getActivitiesByTrip';

export default function TripInfo() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hotels, setHotels] = useState([])
  const [flights, setFlights] = useState([])
  const [activities, setActivities] = useState([])

  useEffect(() => {
    setIsLoading(true);

    getTripById(id)
      .then((fetchedTrip) => {
        if (!fetchedTrip) throw new Error("Trip not found");
        setTrip(fetchedTrip);
        return getAccommodationsByTripId(id);
      })
      .then((res) => {
        console.log(id, res, "<------ IS THIS HOTELS");
        setHotels(res || []);
        return getFlightsByTripId(id)
      })
      .then((res) => {
        console.log(id, res, "<------ IS THIS FLIGHTS");
        setFlights(res || []);
        return getActivitiesByTripId(id)

      })
      .then((res) => {
        console.log(id, res, "<------ IS THIS ACTIVITIES");
        setActivities(res || []);
      })
      .catch((error) => {
        console.error(error);
        setError("Trip not found or failed to load accommodations");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);


  return (
    <>
      <GoBackHeader></GoBackHeader>
      <View style={styles.container}>
        {isLoading && <Text>Loading trip...</Text>}
        {error && <Text>{error}</Text>}
        {!trip && (
          <Text>No trip data available</Text>
        )}
        {trip && (
          <>
            <Image
              style={styles.cardImg}
            // source={{
            //     uri: '',
            // }}
            />
            <Text style={styles.header}>{trip.tripName}</Text>
            <Text style={styles.text}>{trip.location}</Text>
            <Text>Start Date: {trip.startDate.toDate().toLocaleDateString()}</Text>
            <Text>End Date: {trip.endDate.toDate().toLocaleDateString()}</Text>
            <Text style={styles.sections}>Saved Flights:</Text>
            {flights.map((flight, index) => (
              <Text key={index}>{flight.departureLocation}</Text>
            ))}
            <Text style={styles.sections}>Saved Hotels:</Text>
            {hotels.map((hotel, index) => (
              <Text key={index}>{hotel.name}</Text>
            ))}
            <Text style={styles.sections}>Saved Activities:</Text>
            {activities.map((activity, index) => (
              <Text key={index}>{activity.cost}</Text>
            ))}

          </>
        )}
      </View>
    </>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center'

  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30
  },
  cardImg: {
    width: 150,
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 30
  },
  sections: {
    marginTop: 30,
  },
  text: {
    fontWeight: 600,
  },
});


