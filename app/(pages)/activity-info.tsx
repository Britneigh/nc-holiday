import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Trip } from '@/firestoreService/types';
import { getTripById } from '@/firestoreService/trip/getTripById';

export default function ActivityInfo() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true)
      getTripById(id)
        .then((fetchedTrip) => {
            setIsLoading(false)
            setTrip(fetchedTrip);
        })
        .catch((error) => {
          setIsLoading(false)
          setError("Trip not found")
            throw error;
        })
  }, [id]);

    return (
  <View style={styles.container}>
    <Text style={styles.text}>Activity Info</Text>
    {isLoading && <Text>Loading trip...</Text>}
    {error && <Text>{error}</Text>}
    {!trip && (
      <Text>No trip data available</Text>
    )}
    {trip && (
      <>
        <Text style={styles.text}>{trip.tripName}</Text>
        <Text style={styles.text}>Trip Location: {trip.location}</Text>
        <Text>Start Date: {trip.startDate.toDate().toLocaleDateString()}</Text>
        <Text>End Date: {trip.endDate.toDate().toLocaleDateString()}</Text>
        <Text style={styles.sections}>Saved Flights:</Text>
        <Text style={styles.sections}>Saved Hotels:</Text>
      </>
    )}
  </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
        alignItems: 'center',
        textAlign: 'center',
        gap: 10,
    },
    sections: {
        marginTop: 30,
    },
    text: {
        fontWeight: 600,
    },
});